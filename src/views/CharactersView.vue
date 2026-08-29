<template>
  <v-container class="py-10" style="max-width: 1100px">
    <div class="mb-8">
      <h1 class="font-heading text-h3 font-weight-bold mb-1" style="color: #f1ede0">Characters</h1>
      <p class="text-body-1 text-muted">Explore the people of Middle-earth.</p>
    </div>

    <v-row class="mb-6" dense>
      <v-col cols="12" sm="6">
        <SearchBar v-model="name" placeholder="Search by name…" />
      </v-col>
      <v-col cols="6" sm="3">
        <v-select v-model="race" :items="raceOptions" label="Race" hide-details density="comfortable" variant="outlined" />
      </v-col>
      <v-col cols="6" sm="3">
        <v-select v-model="gender" :items="genderOptions" label="Gender" hide-details density="comfortable" variant="outlined" />
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

    <template v-else-if="characters.length">
      <v-row>
        <v-col v-for="c in characters" :key="c.id" cols="12" sm="6" md="4">
          <CharacterCard :character="c" />
        </v-col>
      </v-row>

      <div class="d-flex justify-center mt-8">
        <v-pagination v-model="page" :length="totalPages" :total-visible="5" density="comfortable" />
      </div>
    </template>

    <EmptyState v-else message="No characters found. Try changing your search or filters." />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { charactersApi } from '@/api/characters'
import { normalizeErrorMessage } from '@/api/errorMessage'
import { ApiRequestError } from '@/api/client'
import type { ApiCharacter } from '@/api/types'
import SearchBar from '@/components/SearchBar.vue'
import CharacterCard from '@/components/CharacterCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const ALL_RACES = 'All races'
const ALL_GENDERS = 'All genders'

const name = ref('')
const race = ref(ALL_RACES)
const gender = ref(ALL_GENDERS)
const page = ref(1)
const limit = 6

const characters = ref<ApiCharacter[]>([])
const totalPages = ref(1)
const loading = ref(false)
const error = ref('')

const raceOptions = ref<string[]>([ALL_RACES])
const genderOptions = ref<string[]>([ALL_GENDERS])

let debounceHandle: ReturnType<typeof setTimeout> | undefined

async function load() {
  loading.value = true
  error.value = ''
  try {
    const result = await charactersApi.getAll({
      page: page.value,
      limit,
      name: name.value || undefined,
      race: race.value === ALL_RACES ? undefined : race.value,
      gender: gender.value === ALL_GENDERS ? undefined : gender.value
    })
    characters.value = result.data
    totalPages.value = Math.max(1, Math.ceil(result.total / result.limit))
  } catch (err) {
    characters.value = []
    error.value = err instanceof ApiRequestError ? normalizeErrorMessage(err.message) : 'Something went wrong.'
  } finally {
    loading.value = false
  }
}

async function loadFilterOptions() {
  const result = await charactersApi.getAll({ limit: 100 })
  raceOptions.value = [ALL_RACES, ...new Set(result.data.map((c) => c.race).filter(Boolean))]
  genderOptions.value = [ALL_GENDERS, ...new Set(result.data.map((c) => c.gender).filter((g): g is string => Boolean(g)))]
}

function resetPageAndLoad() {
  if (page.value === 1) load()
  else page.value = 1
}

watch(name, () => {
  clearTimeout(debounceHandle)
  debounceHandle = setTimeout(resetPageAndLoad, 350)
})

watch([race, gender], () => {
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
