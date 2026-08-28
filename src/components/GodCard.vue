<template>
  <v-card class="pa-5 h-100 d-flex flex-column res-item lort-transition lort-hover-lift" :to="`/gods/${god.id}`">
    <div class="d-flex align-center justify-space-between mb-2">
      <span class="font-heading text-h6 font-weight-bold" style="color: #f1ede0">{{ god.name }}</span>
      <v-chip size="x-small" variant="outlined" color="primary">{{ god.type }}</v-chip>
    </div>
    <div class="text-body-2 text-muted mb-4 flex-grow-1">
      <router-link
        v-if="god.characterId"
        :to="`/characters/${god.characterId}`"
        class="text-decoration-none"
        style="color: #c9a961"
        @click.stop
      >
        Character #{{ god.characterId }}
      </router-link>
    </div>
    <span class="text-body-2 font-weight-medium" style="color: #c9a961">View details →</span>
  </v-card>
</template>

<script setup lang="ts">
import type { ApiAinur } from '@/api/types'

defineProps<{ god: ApiAinur }>()
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
