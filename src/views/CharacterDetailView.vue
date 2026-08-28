<template>
  <v-container class="py-10" style="max-width: 900px">
    <router-link to="/characters" class="text-body-2 text-muted d-inline-flex align-center mb-6 text-decoration-none">
      <v-icon icon="mdi-arrow-left" size="16" class="mr-1" /> Back to Characters
    </router-link>

    <div v-if="loading" class="d-flex flex-column ga-4">
      <v-skeleton-loader type="heading, text, text" />
    </div>

    <div v-else-if="notFound" class="text-center py-16">
      <v-icon icon="mdi-alert-circle-outline" size="40" class="text-muted mb-3" />
      <div class="text-body-1" style="color: #cfd4c9">Character not found.</div>
    </div>

    <div v-else-if="error" class="text-center py-16">
      <v-icon icon="mdi-alert-circle-outline" size="40" class="text-muted mb-3" />
      <div class="text-body-1 mb-4" style="color: #cfd4c9">{{ error }}</div>
      <v-btn variant="outlined" @click="load">Retry</v-btn>
    </div>

    <div v-else-if="character">
      <h1 class="font-heading text-h3 font-weight-bold mb-1" style="color: #f1ede0">{{ character.name }}</h1>
      <div class="d-flex ga-2 mb-6 flex-wrap">
        <v-chip v-if="character.race" size="small" variant="outlined" color="primary">{{ character.race }}</v-chip>
        <v-chip v-if="character.realm" size="small" variant="outlined">{{ character.realm }}</v-chip>
      </div>

      <v-row class="mb-8">
        <v-col v-for="field in fields" :key="field.label" cols="12" sm="6" md="4">
          <div class="text-overline text-muted mb-1">{{ field.label }}</div>
          <div class="text-body-1">{{ field.value || '—' }}</div>
        </v-col>
      </v-row>

      <div v-if="character.wikiUrl" class="mb-10">
        <a :href="character.wikiUrl" target="_blank" rel="noopener" class="text-body-2" style="color: #c9a961">
          View on wiki ↗
        </a>
      </div>

      <v-divider class="mb-8" style="border-color: var(--lort-border)" />

      <div class="text-overline text-muted mb-3">API Endpoint</div>
      <ApiEndpoint :path="`/api/characters/${character.id}`" class="mb-4" />
      <div class="text-overline text-muted mb-3">Response</div>
      <JsonViewer :value="character" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { charactersApi } from '@/api/characters'
import { normalizeErrorMessage } from '@/api/errorMessage'
import { ApiRequestError } from '@/api/client'
import type { ApiCharacter } from '@/api/types'
import ApiEndpoint from '@/components/ApiEndpoint.vue'
import JsonViewer from '@/components/JsonViewer.vue'

const route = useRoute()

const character = ref<ApiCharacter | null>(null)
const loading = ref(false)
const error = ref('')
const notFound = ref(false)

const fields = computed(() =>
  character.value
    ? [
        { label: 'Race', value: character.value.race },
        { label: 'Gender', value: character.value.gender },
        { label: 'Realm', value: character.value.realm },
        { label: 'Birth', value: character.value.birth },
        { label: 'Death', value: character.value.death },
        { label: 'Hair', value: character.value.hair },
        { label: 'Height', value: character.value.height },
        { label: 'Spouse', value: character.value.spouse }
      ]
    : []
)

async function load() {
  loading.value = true
  error.value = ''
  notFound.value = false
  character.value = null
  const id = Number(route.params.id)
  if (!Number.isInteger(id) || id <= 0) {
    notFound.value = true
    loading.value = false
    return
  }
  try {
    character.value = await charactersApi.getById(id)
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
