<template>
  <v-text-field
    :model-value="modelValue"
    prepend-inner-icon="mdi-magnify"
    :placeholder="placeholder"
    hide-details
    clearable
    @update:model-value="$emit('update:modelValue', $event ?? '')"
  />
</template>

<script setup lang="ts">
withDefaults(defineProps<{ modelValue: string; placeholder?: string }>(), {
  placeholder: 'Search…'
})
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
