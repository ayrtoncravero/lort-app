import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },

    { path: '/characters', name: 'characters', component: () => import('@/views/CharactersView.vue') },
    { path: '/characters/:id', name: 'character-detail', component: () => import('@/views/CharacterDetailView.vue') },

    { path: '/places', name: 'places', component: () => import('@/views/PlacesView.vue') },
    { path: '/places/:id', name: 'place-detail', component: () => import('@/views/PlaceDetailView.vue') },

    { path: '/races', name: 'races', component: () => import('@/views/RacesView.vue') },
    { path: '/races/:id', name: 'race-detail', component: () => import('@/views/RaceDetailView.vue') },

    { path: '/movies', name: 'movies', component: () => import('@/views/MoviesView.vue') },
    { path: '/movies/:id', name: 'movie-detail', component: () => import('@/views/MovieDetailView.vue') },

    { path: '/books', name: 'books', component: () => import('@/views/BooksView.vue') },
    { path: '/books/:id', name: 'book-detail', component: () => import('@/views/BookDetailView.vue') },

    { path: '/quotes', name: 'quotes', component: () => import('@/views/QuotesView.vue') },
    { path: '/quotes/:id', name: 'quote-detail', component: () => import('@/views/QuoteDetailView.vue') },

    { path: '/gods', name: 'gods', component: () => import('@/views/GodsView.vue') },
    { path: '/gods/:id', name: 'god-detail', component: () => import('@/views/GodDetailView.vue') },

    { path: '/docs', name: 'docs', component: () => import('@/views/DocsView.vue') },
    { path: '/explorer', name: 'explorer', component: () => import('@/views/ExplorerView.vue') },

    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue') }
  ]
})

export default router
