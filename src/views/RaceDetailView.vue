<template>
  <v-container class="py-10" style="max-width: 900px">
    <router-link to="/races" class="text-body-2 text-muted d-inline-flex align-center mb-6 text-decoration-none">
      <v-icon icon="mdi-arrow-left" size="16" class="mr-1" /> Back to Races
    </router-link>

    <div v-if="loading" class="d-flex flex-column ga-4">
      <v-skeleton-loader type="heading, text, text" />
    </div>

    <div v-else-if="notFound" class="text-center py-16">
      <v-icon icon="mdi-alert-circle-outline" size="40" class="text-muted mb-3" />
      <div class="text-body-1" style="color: #cfd4c9">Race not found.</div>
    </div>

    <div v-else-if="error" class="text-center py-16">
      <v-icon icon="mdi-alert-circle-outline" size="40" class="text-muted mb-3" />
      <div class="text-body-1 mb-4" style="color: #cfd4c9">{{ error }}</div>
      <v-btn variant="outlined" @click="load">Retry</v-btn>
    </div>

    <div v-else-if="race">
      <h1 class="font-heading text-h3 font-weight-bold mb-1" style="color: #f1ede0">{{ race.name }}</h1>
      <div class="d-flex ga-2 mb-6 flex-wrap">
        <v-chip size="small" variant="outlined" color="primary">{{ race.type }}</v-chip>
      </div>

      <v-row class="mb-8">
        <v-col cols="12" sm="6">
          <div class="text-overline text-muted mb-1">Parent id</div>
          <div class="text-body-1">{{ race.parentId ?? '—' }}</div>
        </v-col>
      </v-row>

      <div v-if="race.wikiUrl" class="mb-10">
        <a :href="race.wikiUrl" target="_blank" rel="noopener" class="text-body-2" style="color: #c9a961">
          View on wiki ↗
        </a>
      </div>

      <v-divider class="mb-8" style="border-color: var(--lort-border)" />

      <div class="text-overline text-muted mb-3">API Endpoint</div>
      <ApiEndpoint :path="`/api/races/${race.id}`" class="mb-4" />
      <div class="text-overline text-muted mb-3">Response</div>
      <JsonViewer :value="race" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { racesApi } from '@/api/races'
import { normalizeErrorMessage } from '@/api/errorMessage'
import { ApiRequestError } from '@/api/client'
import type { ApiRace } from '@/api/types'
import ApiEndpoint from '@/components/ApiEndpoint.vue'
import JsonViewer from '@/components/JsonViewer.vue'

const route = useRoute()

const race = ref<ApiRace | null>(null)
const loading = ref(false)
const error = ref('')
const notFound = ref(false)

async function load() {
  loading.value = true
  error.value = ''
  notFound.value = false
  race.value = null
  const id = Number(route.params.id)
  if (!Number.isInteger(id) || id <= 0) {
    notFound.value = true
    loading.value = false
    return
  }
  try {
    race.value = await racesApi.getById(id)
  } catch (err) {
    if (err instanceof ApiRequestError && err.statusCode === 404) {
      notFound.value = true
    } else {
      error.value = err instanceof ApiRequestError ? normalizeErrorMessage(err.message) : 'Something went wrong.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => route.params.id, load)
</script>
