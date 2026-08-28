<template>
  <v-btn
    size="small"
    variant="outlined"
    :prepend-icon="copied ? 'mdi-check' : 'mdi-content-copy'"
    :color="copied ? 'success' : undefined"
    class="text-caption"
    @click="copy"
  >
    {{ copied ? 'Copied' : 'Copy' }}
  </v-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ text: string }>()
const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    setTimeout(() => (copied.value = false), 1600)
  } catch {
    copied.value = false
  }
}
</script>
