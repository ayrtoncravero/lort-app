<template>
  <ApiCodeBlock :code="formatted" label="response" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ApiCodeBlock from './ApiCodeBlock.vue'

const props = defineProps<{ value: unknown }>()
const formatted = computed(() => JSON.stringify(props.value, null, 2))
</script>
