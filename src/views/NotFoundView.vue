<template>
  <v-container class="py-16 text-center">
    <img :src="notFoundImage" alt="404" class="mb-6" style="max-width: 560px; width: 100%; height: auto" />
    <div class="text-h1 font-heading font-weight-bold mb-2" style="color: #c9a961">404</div>
    <p class="text-body-1 text-muted mb-6">This path does not exist in Middle-earth.</p>
    <v-btn to="/" color="primary">Back Home</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import notFoundImage from '@/assets/404-gandalf.png'
</script>
