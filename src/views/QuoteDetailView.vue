<template>
  <v-container class="py-10" style="max-width: 800px">
    <router-link to="/quotes" class="text-body-2 text-muted d-inline-flex align-center mb-6 text-decoration-none">
      <v-icon icon="mdi-arrow-left" size="16" class="mr-1" /> Back to Quotes
    </router-link>

    <div v-if="loading" class="d-flex flex-column ga-4">
      <v-skeleton-loader type="heading, text, text" />
    </div>

    <div v-else-if="notFound" class="text-center py-16">
      <v-icon icon="mdi-alert-circle-outline" size="40" class="text-muted mb-3" />
      <div class="text-body-1" style="color: #cfd4c9">Quote not found.</div>
    </div>

    <div v-else-if="error" class="text-center py-16">
      <v-icon icon="mdi-alert-circle-outline" size="40" class="text-muted mb-3" />
      <div class="text-body-1 mb-4" style="color: #cfd4c9">{{ error }}</div>
      <v-btn variant="outlined" @click="load">Retry</v-btn>
    </div>

    <div v-else-if="quote">
      <p class="font-heading text-h4 font-weight-medium mb-4" style="color: #e8dfc8">“{{ quote.dialog }}”</p>
      <div v-if="quote.character || quote.movie" class="text-body-1 text-muted mb-8">
        <template v-if="quote.character">— {{ quote.character.name }}</template>
        <template v-if="quote.movie">, <em>{{ quote.movie.name }}</em></template>
      </div>

      <v-divider class="mb-8" style="border-color: var(--lort-border)" />

      <div class="text-overline text-muted mb-3">API Endpoint</div>
      <ApiEndpoint :path="`/api/quotes/${quote.id}`" class="mb-4" />
      <div class="text-overline text-muted mb-3">Response</div>
      <JsonViewer :value="quote" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { quotesApi } from '@/api/quotes'
import { normalizeErrorMessage } from '@/api/errorMessage'
import { ApiRequestError } from '@/api/client'
import type { ApiQuote } from '@/api/types'
import ApiEndpoint from '@/components/ApiEndpoint.vue'
import JsonViewer from '@/components/JsonViewer.vue'

const route = useRoute()

const quote = ref<ApiQuote | null>(null)
const loading = ref(false)
const error = ref('')
const notFound = ref(false)

async function load() {
  loading.value = true
  error.value = ''
  notFound.value = false
  quote.value = null
  const id = Number(route.params.id)
  if (!Number.isInteger(id) || id <= 0) {
    notFound.value = true
    loading.value = false
    return
  }
  try {
    quote.value = await quotesApi.getById(id)
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
