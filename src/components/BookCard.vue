<template>
  <v-card class="pa-5 res-item lort-transition lort-hover-lift d-flex align-center justify-space-between" :to="`/books/${book.id}`">
    <span class="font-heading text-h6 font-weight-bold" style="color: #f1ede0">{{ book.name }}</span>
    <span class="text-body-2 font-weight-medium" style="color: #c9a961">View details →</span>
  </v-card>
</template>

<script setup lang="ts">
import type { ApiBook } from '@/api/types'

defineProps<{ book: ApiBook }>()
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
