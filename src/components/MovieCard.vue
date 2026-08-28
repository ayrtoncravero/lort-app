<template>
  <v-card class="pa-5 h-100 d-flex flex-column movie-card lort-transition lort-hover-lift" :to="`/movies/${movie.id}`">
    <div class="d-flex align-center justify-space-between mb-2">
      <span class="font-heading text-h6 font-weight-bold" style="color: #f1ede0">{{ movie.name }}</span>
      <v-chip size="x-small" variant="outlined" color="primary">{{ movie.runtimeInMinutes }} min</v-chip>
    </div>
    <div class="text-body-2 text-muted mb-4 flex-grow-1">
      <div>Rotten Tomatoes: {{ movie.rottenTomatoesScore }}%</div>
      <div>Academy wins: {{ movie.academyAwardWins }} / {{ movie.academyAwardNominations }} nominations</div>
    </div>
    <span class="text-body-2 font-weight-medium" style="color: #c9a961">View details →</span>
  </v-card>
</template>

<script setup lang="ts">
import type { ApiMovie } from '@/api/types'

defineProps<{ movie: ApiMovie }>()
</script>

<style scoped>
.movie-card {
  background: #141714;
  border-color: var(--lort-border) !important;
}
.movie-card:hover {
  border-color: #c9a961 !important;
}
</style>
