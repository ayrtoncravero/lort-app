<template>
  <v-container class="py-10" style="max-width: 1100px">
    <div class="mb-8">
      <h1 class="font-heading text-h3 font-weight-bold mb-1" style="color: #f1ede0">Places</h1>
      <p class="text-body-1 text-muted">Explore the places of Middle-earth.</p>
    </div>

    <v-row class="mb-6" dense>
      <v-col cols="12" sm="8">
        <SearchBar v-model="name" placeholder="Search by name…" />
      </v-col>
      <v-col cols="12" sm="4">
        <v-select v-model="type" :items="typeOptions" label="Type" hide-details density="comfortable" variant="outlined" />
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

    <template v-else-if="places.length">
      <v-row>
        <v-col v-for="p in places" :key="p.id" cols="12" sm="6" md="4">
          <PlaceCard :place="p" />
        </v-col>
      </v-row>

      <div class="d-flex justify-center mt-8">
        <v-pagination v-model="page" :length="totalPages" density="comfortable" />
      </div>
    </template>

    <EmptyState v-else message="No places found. Try changing your search or filters." />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { placesApi } from '@/api/places'
import { normalizeErrorMessage } from '@/api/errorMessage'
import { ApiRequestError } from '@/api/client'
import type { ApiPlace } from '@/api/types'
import SearchBar from '@/components/SearchBar.vue'
import PlaceCard from '@/components/PlaceCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const ALL_TYPES = 'All types'

const name = ref('')
const type = ref(ALL_TYPES)
const page = ref(1)
const limit = 6

const places = ref<ApiPlace[]>([])
const totalPages = ref(1)
const loading = ref(false)
const error = ref('')

const typeOptions = ref<string[]>([ALL_TYPES])

let debounceHandle: ReturnType<typeof setTimeout> | undefined

async function load() {
  loading.value = true
  error.value = ''
  try {
    const result = await placesApi.getAll({
      page: page.value,
      limit,
      name: name.value || undefined,
      type: type.value === ALL_TYPES ? undefined : type.value
    })
    places.value = result.data
    totalPages.value = Math.max(1, Math.ceil(result.total / result.limit))
  } catch (err) {
    places.value = []
    error.value = err instanceof ApiRequestError ? normalizeErrorMessage(err.message) : 'Something went wrong.'
  } finally {
    loading.value = false
  }
}

async function loadFilterOptions() {
  const result = await placesApi.getAll({ limit: 100 })
  typeOptions.value = [ALL_TYPES, ...new Set(result.data.map((p) => p.type).filter(Boolean))]
}

function resetPageAndLoad() {
  if (page.value === 1) load()
  else page.value = 1
}

watch(name, () => {
  clearTimeout(debounceHandle)
  debounceHandle = setTimeout(resetPageAndLoad, 350)
})

watch(type, () => {
  clearTimeout(debounceHandle)
  resetPageAndLoad()
})

watch(page, load)

onMounted(() => {
  load()
  loadFilterOptions()
})
</script>

<style scoped>
.skeleton-item {
  background: transparent;
}
</style>
