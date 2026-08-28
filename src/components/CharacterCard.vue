<template>
  <v-card class="pa-5 h-100 d-flex flex-column char-card lort-transition lort-hover-lift" :to="`/characters/${character.id}`">
    <div class="d-flex align-center justify-space-between mb-2">
      <span class="font-heading text-h6 font-weight-bold" style="color: #f1ede0">{{ character.name }}</span>
      <v-chip v-if="character.race" size="x-small" variant="outlined" color="primary">{{ character.race }}</v-chip>
    </div>
    <div v-if="character.realm" class="text-caption text-muted mb-3">{{ character.realm }}</div>
    <div class="text-body-2 text-muted mb-4 flex-grow-1">
      <div v-if="character.gender">Gender: {{ character.gender }}</div>
      <div v-if="character.birth">Born: {{ character.birth }}</div>
    </div>
    <span class="text-body-2 font-weight-medium" style="color: #c9a961">View details →</span>
  </v-card>
</template>

<script setup lang="ts">
import type { ApiCharacter } from '@/api/types'

defineProps<{ character: ApiCharacter }>()
</script>

<style scoped>
.char-card {
  background: #141714;
  border-color: var(--lort-border) !important;
}
.char-card:hover {
  border-color: #c9a961 !important;
}
</style>
