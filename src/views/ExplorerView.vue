<template>
  <v-container class="py-10" style="max-width: 1000px">
    <div class="mb-8">
      <h1 class="font-heading text-h3 font-weight-bold mb-1" style="color: #f1ede0">API Explorer</h1>
      <p class="text-body-1 text-muted">Test LORT API endpoints against the live server. Real HTTP requests, no mock data.</p>
    </div>

    <v-card class="pa-6 mb-6 explorer-panel">
      <v-row dense>
        <v-col cols="12" sm="6">
          <v-select
            v-model="resourceId"
            :items="resourceItems"
            item-title="label"
            item-value="id"
            label="Resource"
            hide-details
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="endpointId"
            :items="endpointItems"
            item-title="label"
            item-value="id"
            label="Endpoint"
            hide-details
          />
        </v-col>
      </v-row>

      <div v-if="comingSoon.length" class="mt-4 text-caption text-muted">
        Coming soon (no live endpoint yet): {{ comingSoon.join(', ') }}
      </div>

      <template v-if="currentEndpoint && currentEndpoint.params.length">
        <div class="text-overline text-muted mt-6 mb-2">Query Parameters</div>
        <v-row dense>
          <v-col v-for="p in currentEndpoint.params" :key="p.name" cols="6" sm="4">
            <v-text-field
              v-model="paramValues[p.name]"
              :label="p.label"
              :type="p.type === 'number' ? 'number' : 'text'"
              hide-details
              density="comfortable"
            />
          </v-col>
        </v-row>
      </template>

      <div class="mt-6 mb-2 text-overline text-muted">Request</div>
      <div class="d-flex align-center flex-wrap ga-3 mb-4">
        <ApiEndpoint :path="requestPath" inline />
        <CopyButton :text="requestUrl" />
      </div>
      <div class="font-mono text-caption text-muted mb-6 request-url">{{ requestUrl }}</div>

      <div class="d-flex justify-end">
        <v-btn color="primary" :loading="loading" :disabled="loading || !canExecute" @click="execute">
          Execute Request
        </v-btn>
      </div>
    </v-card>

    <v-card v-if="result" class="pa-6 explorer-panel">
      <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-2">
        <div class="d-flex align-center ga-3">
          <v-chip :color="result.ok ? 'success' : 'error'" variant="flat" size="small" class="font-mono font-weight-bold">
            {{ result.status }} {{ result.ok ? 'OK' : 'Error' }}
          </v-chip>
          <span class="text-caption text-muted">{{ result.durationMs }} ms</span>
        </div>
        <CopyButton :text="responseText" />
      </div>

      <div v-if="!result.ok" class="mb-4">
        <div class="text-body-1 mb-1" style="color: #cfd4c9">{{ errorMessage }}</div>
        <div v-if="errorDetails" class="text-caption text-muted font-mono">{{ errorDetails }}</div>
      </div>

      <JsonViewer :value="result.body" />
    </v-card>

    <v-card v-else-if="requestFailed" class="pa-6 explorer-panel">
      <div class="text-body-1" style="color: #cfd4c9">{{ requestFailed }}</div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { apiGetRaw, ApiRequestError, buildRequestUrl } from '@/api/client'
import { normalizeErrorMessage } from '@/api/errorMessage'
import { explorerComingSoon, explorerResources } from '@/api/explorerConfig'
import type { ApiError } from '@/api/types'
import ApiEndpoint from '@/components/ApiEndpoint.vue'
import CopyButton from '@/components/CopyButton.vue'
import JsonViewer from '@/components/JsonViewer.vue'

const resourceItems = explorerResources.map((r) => ({ id: r.id, label: r.label }))
const comingSoon = explorerComingSoon

const resourceId = ref(explorerResources[0].id)
const endpointId = ref(explorerResources[0].endpoints[0].id)
const paramValues = reactive<Record<string, string>>({})

const currentResource = computed(() => explorerResources.find((r) => r.id === resourceId.value)!)
const endpointItems = computed(() =>
  currentResource.value.endpoints.map((e) => ({ id: e.id, label: `${e.method} /api${e.path}` }))
)
const currentEndpoint = computed(() => currentResource.value.endpoints.find((e) => e.id === endpointId.value))

function resetParams() {
  for (const key of Object.keys(paramValues)) delete paramValues[key]
  const endpoint = currentEndpoint.value
  if (!endpoint) return
  for (const p of endpoint.params) {
    if (p.name === 'page') paramValues.page = '1'
    else if (p.name === 'limit') paramValues.limit = '20'
    else paramValues[p.name] = ''
  }
}

watch(resourceId, () => {
  endpointId.value = currentResource.value.endpoints[0].id
})
watch(endpointId, resetParams, { immediate: true })

const requestPath = computed(() => {
  const endpoint = currentEndpoint.value
  if (!endpoint) return ''
  if (endpoint.path.includes(':id')) {
    return `/api${endpoint.path.replace(':id', paramValues.id || ':id')}`
  }
  return `/api${endpoint.path}`
})

const isDetail = computed(() => currentEndpoint.value?.path.includes(':id') ?? false)

const queryParams = computed<Record<string, string | number | undefined>>(() => {
  if (isDetail.value || !currentEndpoint.value) return {}
  const out: Record<string, string | number | undefined> = {}
  for (const p of currentEndpoint.value.params) {
    const raw = paramValues[p.name]
    if (raw === undefined || raw === '') continue
    out[p.name] = p.type === 'number' ? Number(raw) : raw
  }
  return out
})

const requestUrl = computed(() => {
  const endpoint = currentEndpoint.value
  if (!endpoint) return ''
  const resolvedPath = endpoint.path.includes(':id') ? endpoint.path.replace(':id', paramValues.id || ':id') : endpoint.path
  return buildRequestUrl(resolvedPath, queryParams.value)
})

const canExecute = computed(() => {
  if (isDetail.value) return Boolean(paramValues.id)
  return true
})

interface ExplorerResult {
  status: number
  ok: boolean
  durationMs: number
  body: unknown
}

const loading = ref(false)
const result = ref<ExplorerResult | null>(null)
const requestFailed = ref('')

const errorMessage = computed(() => {
  if (!result.value || result.value.ok) return ''
  const body = (result.value.body ?? {}) as Partial<ApiError>
  return normalizeErrorMessage(body.message) || 'Request failed.'
})

const errorDetails = computed(() => {
  if (!result.value || result.value.ok) return ''
  const body = (result.value.body ?? {}) as Partial<ApiError>
  return [body.error, body.path].filter(Boolean).join(' · ')
})

const responseText = computed(() => (result.value ? JSON.stringify(result.value.body, null, 2) : ''))

async function execute() {
  const endpoint = currentEndpoint.value
  if (!endpoint || !canExecute.value) return

  loading.value = true
  requestFailed.value = ''
  result.value = null

  const resolvedPath = endpoint.path.includes(':id') ? endpoint.path.replace(':id', paramValues.id) : endpoint.path

  try {
    const raw = await apiGetRaw(resolvedPath, queryParams.value)
    result.value = raw
  } catch (err) {
    requestFailed.value = err instanceof ApiRequestError ? err.message : 'Something went wrong.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.explorer-panel {
  background: #141714;
  border: 1px solid var(--lort-border);
}
.request-url {
  overflow-x: auto;
  white-space: nowrap;
  padding: 8px 12px;
  background: #10130f;
  border: 1px solid var(--lort-border);
  border-radius: 8px;
}
</style>
