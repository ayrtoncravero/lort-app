<template>
  <div class="api-block rounded-lg overflow-hidden">
    <div class="d-flex align-center justify-space-between px-4 py-2 api-block-header">
      <span class="text-caption text-muted font-mono">{{ label }}</span>
      <CopyButton :text="code" />
    </div>
    <pre class="font-mono text-body-2 pa-4 mb-0 api-block-body"><code>{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import CopyButton from './CopyButton.vue'

withDefaults(defineProps<{ code: string; label?: string }>(), { label: 'json' })
</script>

<style scoped>
.api-block {
  background: #10130f;
  border: 1px solid var(--lort-border);
}
.api-block-header {
  background: #14170f14;
  border-bottom: 1px solid var(--lort-border);
}
.api-block-body {
  overflow-x: auto;
  white-space: pre;
  color: #d6d0bd;
  line-height: 1.6;
}
</style>
