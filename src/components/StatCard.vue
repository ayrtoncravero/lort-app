<template>
  <div class="stat-card pa-5 rounded-lg">
    <v-skeleton-loader v-if="loading" type="heading" class="stat-skeleton" />
    <div v-else class="text-h3 font-heading font-weight-bold" style="color: #f1ede0">{{ value }}</div>
    <div class="text-body-2 text-muted mt-1">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ value: string | number; label: string; loading?: boolean }>(), { loading: false })
</script>

<style scoped>
.stat-card {
  background: #141714;
  border: 1px solid var(--lort-border);
}
.stat-skeleton {
  background: transparent;
}
</style>
