<template>
  <v-card class="pa-5 h-100 d-flex flex-column res-item lort-transition lort-hover-lift" :to="`/places/${place.id}`">
    <div class="d-flex align-center justify-space-between mb-2">
      <span class="font-heading text-h6 font-weight-bold" style="color: #f1ede0">{{ place.name }}</span>
      <v-chip size="x-small" variant="outlined" color="primary">{{ place.type }}</v-chip>
    </div>
    <div class="text-body-2 text-muted mb-4 flex-grow-1">
      <div v-if="place.parentId">Parent id: {{ place.parentId }}</div>
    </div>
    <a
      v-if="place.wikiUrl"
      :href="place.wikiUrl"
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
import type { ApiPlace } from '@/api/types'

defineProps<{ place: ApiPlace }>()
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
