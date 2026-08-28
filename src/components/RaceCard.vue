<template>
  <v-card class="pa-5 h-100 d-flex flex-column res-item lort-transition lort-hover-lift" :to="`/races/${race.id}`">
    <div class="d-flex align-center justify-space-between mb-2">
      <span class="font-heading text-h6 font-weight-bold" style="color: #f1ede0">{{ race.name }}</span>
      <v-chip size="x-small" variant="outlined" color="primary">{{ race.type }}</v-chip>
    </div>
    <div class="text-body-2 text-muted mb-4 flex-grow-1">
      <div v-if="race.parentId">Parent id: {{ race.parentId }}</div>
    </div>
    <a
      v-if="race.wikiUrl"
      :href="race.wikiUrl"
      target="_blank"
      rel="noopener"
      class="text-body-2 font-weight-medium"
      style="color: #c9a961"
      @click.stop
    >
      View on wiki ↗
    </a>
    <span v-else class="text-body-2 font-weight-medium" style="color: #c9a961">View details →</span>
  </v-card>
</template>

<script setup lang="ts">
import type { ApiRace } from '@/api/types'

defineProps<{ race: ApiRace }>()
</script>

<style scoped>
.res-item {
  background: #141714;
  border-color: var(--lort-border) !important;
}
.res-item:hover {
  border-color: #c9a961 !important;
}
</style>
