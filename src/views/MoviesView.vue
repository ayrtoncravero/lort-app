<template>
  <v-container class="py-10" style="max-width: 1100px">
    <div class="mb-8">
      <h1 class="font-heading text-h3 font-weight-bold mb-1" style="color: #f1ede0">Movies</h1>
      <p class="text-body-1 text-muted">Film adaptations of the legendarium.</p>
    </div>

    <SearchBar v-model="name" placeholder="Search by title…" class="mb-6" />

    <div v-if="loading" class="d-flex flex-column ga-4">
      <v-skeleton-loader v-for="n in 3" :key="n" type="card" class="skeleton-item" />
    </div>

    <div v-else-if="error" class="text-center py-16">
      <v-icon icon="mdi-alert-circle-outline" size="40" class="text-muted mb-3" />
      <div class="text-body-1 mb-4" style="color: #cfd4c9">{{ error }}</div>
      <v-btn variant="outlined" @click="load">Retry</v-btn>
    </div>

    <template v-else-if="movies.length">
      <v-row>
        <v-col v-for="m in movies" :key="m.id" cols="12" sm="6" md="4">
          <MovieCard :movie="m" />
        </v-col>
      </v-row>

      <div class="d-flex justify-center mt-8">
        <v-pagination v-model="page" :length="totalPages" :total-visible="5" density="comfortable" />
      </div>
    </template>

    <EmptyState v-else message="No movies found. Try changing your search." />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { moviesApi } from '@/api/movies'
import { normalizeErrorMessage } from '@/api/errorMessage'
import { ApiRequestError } from '@/api/client'
import type { ApiMovie } from '@/api/types'
import SearchBar from '@/components/SearchBar.vue'
import MovieCard from '@/components/MovieCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const name = ref('')
const page = ref(1)
const limit = 6

const movies = ref<ApiMovie[]>([])
const totalPages = ref(1)
const loading = ref(false)
const error = ref('')

let debounceHandle: ReturnType<typeof setTimeout> | undefined

async function load() {
  loading.value = true
  error.value = ''
  try {
    const result = await moviesApi.getAll({ page: page.value, limit, name: name.value || undefined })
    movies.value = result.data
    totalPages.value = Math.max(1, Math.ceil(result.total / result.limit))
  } catch (err) {
    movies.value = []
    error.value = err instanceof ApiRequestError ? normalizeErrorMessage(err.message) : 'Something went wrong.'
  } finally {
    loading.value = false
  }
}

watch(name, () => {
  page.value = 1
  clearTimeout(debounceHandle)
  debounceHandle = setTimeout(load, 350)
})

watch(page, load)

onMounted(load)
</script>

<style scoped>
.skeleton-item {
  background: transparent;
}
</style>
