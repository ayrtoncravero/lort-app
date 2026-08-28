<template>
  <v-footer class="border-t" color="background" style="border-color: var(--lort-border)">
    <v-container class="py-8" style="max-width: 1280px">
      <div class="d-flex flex-column flex-md-row justify-space-between ga-6">
        <div style="max-width: 360px">
          <div class="d-flex align-center mb-2">
            <span class="lort-mark mr-2">⟡</span>
            <span class="font-heading text-h6 font-weight-bold" style="color: #f1ede0">LORT</span>
          </div>
          <p class="text-body-2 text-muted">
            An unofficial, non-commercial, fan-made project for exploring characters, places and stories from
            Middle-earth. Not affiliated with, endorsed by, or sponsored by the Tolkien Estate, Middle-earth
            Enterprises, Warner Bros., or any other rights holder.
          </p>
        </div>

        <div class="d-flex flex-wrap ga-md-16 ga-8">
          <div>
            <div class="text-overline text-muted mb-2">Resources</div>
            <div class="d-flex flex-column ga-1">
              <router-link v-for="l in resourceLinks" :key="l.to" :to="l.to" class="footer-link">{{ l.label }}</router-link>
            </div>
          </div>
          <div>
            <div class="text-overline text-muted mb-2">Developers</div>
            <div class="d-flex flex-column ga-1">
              <router-link to="/docs" class="footer-link">Documentation</router-link>
              <router-link to="/explorer" class="footer-link">API Explorer</router-link>
            </div>
          </div>
        </div>
      </div>

      <v-divider class="my-6" style="border-color: var(--lort-border)" />

      <div class="d-flex flex-column flex-sm-row justify-space-between text-caption text-muted ga-2">
        <span>© {{ year }} LORT — built for demonstration purposes.</span>
        <span>Live data from the LORT API</span>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

const resourceLinks = [
  { to: '/characters', label: 'Characters' },
  { to: '/movies', label: 'Movies' },
  { to: '/books', label: 'Books' },
  { to: '/quotes', label: 'Quotes' },
  { to: '/places', label: 'Places' },
  { to: '/races', label: 'Races' },
  { to: '/gods', label: 'Gods' }
]
</script>

<style scoped>
.lort-mark {
  color: #c9a961;
  font-size: 1.1rem;
}
.footer-link {
  color: var(--lort-muted);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.15s ease;
}
.footer-link:hover {
  color: #c9a961;
}
</style>
