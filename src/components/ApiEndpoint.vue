<template>
  <div class="d-flex align-center ga-3 flex-wrap">
    <v-chip color="primary" variant="flat" size="small" class="font-mono font-weight-bold text-uppercase" density="comfortable">
      {{ method }}
    </v-chip>
    <span class="font-mono text-body-1" style="color: #e8dfc8">{{ path }}</span>
    <v-spacer v-if="!inline" />
    <CopyButton v-if="!inline" :text="`${method} ${path}`" />
  </div>
</template>

<script setup lang="ts">
import CopyButton from './CopyButton.vue'

withDefaults(defineProps<{ method?: string; path: string; inline?: boolean }>(), {
  method: 'GET',
  inline: false
})
</script>
