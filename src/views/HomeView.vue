<template>
  <div>
    <HeroSection />

    <section class="py-12">
      <v-container style="max-width: 1100px">
        <v-row dense>
          <v-col v-for="s in stats" :key="s.label" cols="6" sm="4" md="3">
            <StatCard :value="s.error ? '—' : s.value" :label="s.label" :loading="loadingStats" />
          </v-col>
        </v-row>
        <p v-if="statsError" class="text-caption text-muted text-center mt-4 mb-0">
          Unable to load live counts for some resources.
          <v-btn variant="text" size="small" density="compact" class="text-caption" @click="loadStats">Retry</v-btn>
        </p>
      </v-container>
    </section>

    <section class="py-12" style="background: #10130f; border-top: 1px solid var(--lort-border); border-bottom: 1px solid var(--lort-border)">
      <v-container style="max-width: 900px">
        <div class="text-center mb-8">
          <div class="text-overline text-muted mb-2">API EXAMPLE</div>
          <h2 class="font-heading text-h4 font-weight-bold" style="color: #f1ede0">A predictable, RESTful shape</h2>
        </div>
        <ApiEndpoint path="/api/characters" class="mb-3" />
        <ApiCodeBlock :code="exampleResponse" />
      </v-container>
    </section>

    <section class="py-12">
      <v-container style="max-width: 1100px">
        <div class="text-center mb-8">
          <div class="text-overline text-muted mb-2">RESOURCES</div>
          <h2 class="font-heading text-h4 font-weight-bold" style="color: #f1ede0">Explore Middle-earth</h2>
        </div>
        <v-row>
          <v-col v-for="r in resources" :key="r.title" cols="12" sm="6" md="4">
            <ResourceCard
              :icon="r.icon"
              :title="r.title"
              :description="r.description"
              :count="totals[r.countKey] ?? '—'"
              :to="r.to"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { charactersApi } from '@/api/characters'
import { moviesApi } from '@/api/movies'
import { booksApi } from '@/api/books'
import { quotesApi } from '@/api/quotes'
import { placesApi } from '@/api/places'
import { racesApi } from '@/api/races'
import { ainurApi } from '@/api/ainur'
import { normalizeErrorMessage } from '@/api/errorMessage'
import { ApiRequestError } from '@/api/client'
import HeroSection from '@/components/HeroSection.vue'
import StatCard from '@/components/StatCard.vue'
import ApiEndpoint from '@/components/ApiEndpoint.vue'
import ApiCodeBlock from '@/components/ApiCodeBlock.vue'
import ResourceCard from '@/components/ResourceCard.vue'

type StatKey = 'characters' | 'movies' | 'books' | 'quotes' | 'places' | 'races' | 'gods'

const totals = ref<Record<StatKey, number | null>>({
  characters: null,
  movies: null,
  books: null,
  quotes: null,
  places: null,
  races: null,
  gods: null
})
const loadingStats = ref(false)
const statsError = ref('')

async function loadStats() {
  loadingStats.value = true
  statsError.value = ''
  const [charactersResult, moviesResult, booksResult, quotesResult, placesResult, racesResult, ainurResult] =
    await Promise.allSettled([
      charactersApi.getAll({ limit: 1 }),
      moviesApi.getAll({ limit: 1 }),
      booksApi.getAll({ limit: 1 }),
      quotesApi.getAll({ limit: 1 }),
      placesApi.getAll({ limit: 1 }),
      racesApi.getAll({ limit: 1 }),
      ainurApi.getAll({ limit: 1 })
    ])

  totals.value = {
    characters: charactersResult.status === 'fulfilled' ? charactersResult.value.total : null,
    movies: moviesResult.status === 'fulfilled' ? moviesResult.value.total : null,
    books: booksResult.status === 'fulfilled' ? booksResult.value.total : null,
    quotes: quotesResult.status === 'fulfilled' ? quotesResult.value.total : null,
    places: placesResult.status === 'fulfilled' ? placesResult.value.total : null,
    races: racesResult.status === 'fulfilled' ? racesResult.value.total : null,
    gods: ainurResult.status === 'fulfilled' ? ainurResult.value.total : null
  }

  const results = [charactersResult, moviesResult, booksResult, quotesResult, placesResult, racesResult, ainurResult]
  const firstFailure = results.find((r) => r.status === 'rejected')
  if (firstFailure && firstFailure.status === 'rejected') {
    const err = firstFailure.reason
    statsError.value = err instanceof ApiRequestError ? normalizeErrorMessage(err.message) : 'Something went wrong.'
  }

  loadingStats.value = false
}

const stats = computed(() => [
  { label: 'Characters', value: totals.value.characters ?? '—', error: totals.value.characters === null },
  { label: 'Movies', value: totals.value.movies ?? '—', error: totals.value.movies === null },
  { label: 'Books', value: totals.value.books ?? '—', error: totals.value.books === null },
  { label: 'Quotes', value: totals.value.quotes ?? '—', error: totals.value.quotes === null },
  { label: 'Places', value: totals.value.places ?? '—', error: totals.value.places === null },
  { label: 'Races', value: totals.value.races ?? '—', error: totals.value.races === null },
  { label: 'Gods', value: totals.value.gods ?? '—', error: totals.value.gods === null }
])

const exampleResponse = JSON.stringify(
  {
    data: [{ id: 3, name: 'Aragorn II Elessar', race: 'Human', gender: 'Male' }],
    page: 1,
    limit: 20,
    total: 50
  },
  null,
  2
)

interface HomeResource {
  icon: string
  title: string
  description: string
  countKey: StatKey
  to: string
}

const resources: HomeResource[] = [
  { icon: 'mdi-account-group-outline', title: 'Characters', description: 'People and beings of Middle-earth.', countKey: 'characters', to: '/characters' },
  { icon: 'mdi-movie-outline', title: 'Movies', description: 'Film adaptations of the legendarium.', countKey: 'movies', to: '/movies' },
  { icon: 'mdi-book-outline', title: 'Books', description: 'The written source material.', countKey: 'books', to: '/books' },
  { icon: 'mdi-format-quote-close', title: 'Quotes', description: 'Memorable lines from the saga.', countKey: 'quotes', to: '/quotes' },
  { icon: 'mdi-map-marker-outline', title: 'Places', description: 'Realms, settlements and landmarks of Middle-earth.', countKey: 'places', to: '/places' },
  { icon: 'mdi-shield-outline', title: 'Races', description: 'The peoples of Middle-earth.', countKey: 'races', to: '/races' },
  { icon: 'mdi-star-four-points-outline', title: 'Gods', description: 'Eru, the Valar and the Maiar.', countKey: 'gods', to: '/gods' }
]

onMounted(loadStats)
</script>
