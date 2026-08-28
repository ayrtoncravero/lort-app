<template>
  <v-container class="py-10" style="max-width: 900px">
    <router-link to="/movies" class="text-body-2 text-muted d-inline-flex align-center mb-6 text-decoration-none">
      <v-icon icon="mdi-arrow-left" size="16" class="mr-1" /> Back to Movies
    </router-link>

    <div v-if="loading" class="d-flex flex-column ga-4">
      <v-skeleton-loader type="heading, text, text" />
    </div>

    <div v-else-if="notFound" class="text-center py-16">
      <v-icon icon="mdi-alert-circle-outline" size="40" class="text-muted mb-3" />
      <div class="text-body-1" style="color: #cfd4c9">Movie not found.</div>
    </div>

    <div v-else-if="error" class="text-center py-16">
      <v-icon icon="mdi-alert-circle-outline" size="40" class="text-muted mb-3" />
      <div class="text-body-1 mb-4" style="color: #cfd4c9">{{ error }}</div>
      <v-btn variant="outlined" @click="load">Retry</v-btn>
    </div>

    <div v-else-if="movie">
      <h1 class="font-heading text-h3 font-weight-bold mb-1" style="color: #f1ede0">{{ movie.name }}</h1>
      <div class="text-caption text-muted mb-6">{{ movie.releaseYear }} · {{ movie.runtimeInMinutes }} min</div>

      <v-row class="mb-8">
        <v-col cols="6" sm="4">
          <div class="text-overline text-muted mb-1">Budget</div>
          <div class="text-body-1">${{ movie.budgetInMillions }}M</div>
        </v-col>
        <v-col cols="6" sm="4">
          <div class="text-overline text-muted mb-1">Box Office</div>
          <div class="text-body-1">${{ movie.boxOfficeRevenueInMillions }}M</div>
        </v-col>
        <v-col cols="6" sm="4">
          <div class="text-overline text-muted mb-1">Rotten Tomatoes</div>
          <div class="text-body-1">{{ movie.rottenTomatoesScore }}%</div>
        </v-col>
        <v-col cols="6" sm="4">
          <div class="text-overline text-muted mb-1">Academy Nominations</div>
          <div class="text-body-1">{{ movie.academyAwardNominations }}</div>
        </v-col>
        <v-col cols="6" sm="4">
          <div class="text-overline text-muted mb-1">Academy Wins</div>
          <div class="text-body-1">{{ movie.academyAwardWins }}</div>
        </v-col>
      </v-row>

      <v-divider class="mb-8" style="border-color: var(--lort-border)" />

      <div class="text-overline text-muted mb-3">API Endpoint</div>
      <ApiEndpoint :path="`/api/movies/${movie.id}`" class="mb-4" />
      <div class="text-overline text-muted mb-3">Response</div>
      <JsonViewer :value="movie" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { moviesApi } from '@/api/movies'
import { normalizeErrorMessage } from '@/api/errorMessage'
import { ApiRequestError } from '@/api/client'
import type { ApiMovie } from '@/api/types'
import ApiEndpoint from '@/components/ApiEndpoint.vue'
import JsonViewer from '@/components/JsonViewer.vue'

const route = useRoute()

const movie = ref<ApiMovie | null>(null)
const loading = ref(false)
const error = ref('')
const notFound = ref(false)

async function load() {
  loading.value = true
  error.value = ''
  notFound.value = false
  movie.value = null
  const id = Number(route.params.id)
  if (!Number.isInteger(id) || id <= 0) {
    notFound.value = true
    loading.value = false
    return
  }
  try {
    movie.value = await moviesApi.getById(id)
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
