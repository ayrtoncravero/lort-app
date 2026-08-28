<template>
  <v-container class="py-10" style="max-width: 900px">
    <div class="mb-8">
      <h1 class="font-heading text-h3 font-weight-bold mb-1" style="color: #f1ede0">Quotes</h1>
      <p class="text-body-1 text-muted">Memorable lines from the saga.</p>
    </div>

    <v-row class="mb-6" dense>
      <v-col cols="12" sm="6">
        <v-select
          v-model="movieId"
          :items="movieOptions"
          item-title="name"
          item-value="id"
          label="Movie"
          clearable
          hide-details
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="characterId"
          :items="characterOptions"
          item-title="name"
          item-value="id"
          label="Character"
          clearable
          hide-details
        />
      </v-col>
    </v-row>

    <div v-if="loading" class="d-flex flex-column ga-4">
      <v-skeleton-loader v-for="n in 3" :key="n" type="card" class="skeleton-item" />
    </div>

    <div v-else-if="error" class="text-center py-16">
      <v-icon icon="mdi-alert-circle-outline" size="40" class="text-muted mb-3" />
      <div class="text-body-1 mb-4" style="color: #cfd4c9">{{ error }}</div>
      <v-btn variant="outlined" @click="load">Retry</v-btn>
    </div>

    <template v-else-if="quotes.length">
      <div class="d-flex flex-column ga-4">
        <v-card v-for="q in quotes" :key="q.id" class="pa-6 res-item lort-transition lort-hover-lift" :to="`/quotes/${q.id}`">
          <p class="font-heading text-h5 font-weight-medium mb-3" style="color: #e8dfc8">“{{ q.dialog }}”</p>
          <div class="text-body-2 text-muted">
            <template v-if="q.character || q.movie">
              — <span v-if="q.character">{{ q.character.name }}</span
              ><span v-if="q.character && q.movie">, </span
              ><em v-if="q.movie">{{ q.movie.name }}</em>
            </template>
          </div>
        </v-card>
      </div>

      <div class="d-flex justify-center mt-8">
        <v-pagination v-model="page" :length="totalPages" density="comfortable" />
      </div>
    </template>

    <EmptyState v-else message="No quotes found. Try changing your filters." />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { quotesApi } from '@/api/quotes'
import { moviesApi } from '@/api/movies'
import { charactersApi } from '@/api/characters'
import { normalizeErrorMessage } from '@/api/errorMessage'
import { ApiRequestError } from '@/api/client'
import type { ApiCharacter, ApiMovie, ApiQuote } from '@/api/types'
import EmptyState from '@/components/EmptyState.vue'

const movieId = ref<number | undefined>(undefined)
const characterId = ref<number | undefined>(undefined)
const page = ref(1)
const limit = 6

const quotes = ref<ApiQuote[]>([])
const totalPages = ref(1)
const loading = ref(false)
const error = ref('')

const movieOptions = ref<ApiMovie[]>([])
const characterOptions = ref<ApiCharacter[]>([])

async function load() {
  loading.value = true
  error.value = ''
  try {
    const result = await quotesApi.getAll({ page: page.value, limit, movieId: movieId.value, characterId: characterId.value })
    quotes.value = result.data
    totalPages.value = Math.max(1, Math.ceil(result.total / result.limit))
  } catch (err) {
    quotes.value = []
    error.value = err instanceof ApiRequestError ? normalizeErrorMessage(err.message) : 'Something went wrong.'
  } finally {
    loading.value = false
  }
}

async function loadFilterOptions() {
  const [movies, characters] = await Promise.all([
    moviesApi.getAll({ limit: 100 }),
    charactersApi.getAll({ limit: 100 })
  ])
  movieOptions.value = movies.data
  characterOptions.value = characters.data
}

function resetPageAndLoad() {
  if (page.value === 1) load()
  else page.value = 1
}

watch([movieId, characterId], resetPageAndLoad)

watch(page, load)

onMounted(() => {
  load()
  loadFilterOptions()
})
</script>

<style scoped>
.res-item {
  background: #141714;
  border-color: var(--lort-border) !important;
}
.res-item:hover {
  border-color: #c9a961 !important;
}
.skeleton-item {
  background: transparent;
}
</style>
