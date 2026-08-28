<template>
  <div class="text-center py-16">
    <v-icon :icon="icon" size="40" class="text-muted mb-3" />
    <div class="text-body-1 text-muted">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ message?: string; icon?: string }>(), {
  message: 'No results found.',
  icon: 'mdi-compass-outline'
})
</script>
