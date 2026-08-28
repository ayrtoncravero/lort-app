<template>
  <section class="lort-texture hero-section py-16 py-md-16">
    <v-container style="max-width: 1000px" class="text-center position-relative">
      <div class="d-flex justify-center mb-5">
        <span class="hero-ring">⟡</span>
      </div>
      <div class="text-overline text-muted mb-3">THE LORD OF THE RINGS API</div>
      <h1 class="font-heading text-h2 text-md-h1 font-weight-bold mb-4" style="color: #f1ede0">LORT</h1>
      <p class="text-h6 text-md-h5 font-weight-regular mb-4" style="color: #cfd4c9">
        Explore Middle-earth through a simple REST API.
      </p>
      <p class="text-body-1 text-muted mx-auto mb-8" style="max-width: 560px">
        A developer-friendly API for exploring characters, places, stories and legends from Middle-earth.
      </p>
      <div class="d-flex justify-center flex-wrap ga-4">
        <v-btn to="/docs" color="primary" size="large" class="px-6">Get Started</v-btn>
        <v-btn to="/explorer" variant="outlined" size="large" class="px-6">Explore API</v-btn>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.hero-section {
  border-bottom: 1px solid var(--lort-border);
}
.hero-ring {
  color: #c9a961;
  font-size: 2rem;
  opacity: 0.9;
}
</style>
