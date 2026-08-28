<template>
  <v-card class="pa-5 h-100 resource-card lort-transition" :class="{ 'lort-hover-lift': !comingSoon, 'resource-card--soon': comingSoon }" :to="comingSoon ? undefined : to">
    <div class="d-flex align-center justify-space-between mb-3">
      <v-icon :icon="icon" size="28" :color="comingSoon ? undefined : 'primary'" :class="{ 'text-muted': comingSoon }" />
      <span v-if="!comingSoon" class="text-caption text-muted font-mono">{{ count }}</span>
      <v-chip v-else size="x-small" variant="outlined" class="text-muted">Coming soon</v-chip>
    </div>
    <div class="font-heading text-h6 font-weight-bold mb-1" style="color: #f1ede0">{{ title }}</div>
    <p class="text-body-2 text-muted mb-4">{{ description }}</p>
    <span v-if="!comingSoon" class="text-body-2 font-weight-medium" style="color: #c9a961">Explore →</span>
    <span v-else class="text-body-2 text-muted">Not available in the API yet</span>
  </v-card>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string
    title: string
    description: string
    count?: string | number
    to: string
    comingSoon?: boolean
  }>(),
  { comingSoon: false }
)
</script>

<style scoped>
.resource-card {
  background: #141714;
  border-color: var(--lort-border) !important;
}
.resource-card:not(.resource-card--soon):hover {
  border-color: #c9a961 !important;
}
.resource-card--soon {
  opacity: 0.7;
  cursor: default;
}
</style>
