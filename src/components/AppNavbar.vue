<template>
  <v-app-bar flat density="comfortable" color="background" :border="true" height="64">
    <v-container class="d-flex align-center py-0" style="max-width: 1280px">
      <router-link to="/" class="d-flex align-center text-decoration-none mr-8" aria-label="LORT home">
        <span class="lort-mark mr-2">⟡</span>
        <span class="font-heading text-h5 font-weight-bold" style="color: #f1ede0">LORT</span>
      </router-link>

      <div class="d-none d-md-flex align-center ga-1">
        <v-btn
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          variant="text"
          density="comfortable"
          class="text-body-2 text-muted nav-link"
          active-class="nav-link-active"
        >
          {{ link.label }}
        </v-btn>
      </div>

      <v-spacer />

      <div class="d-none d-md-flex align-center ga-2">
        <v-btn to="/docs" variant="text" density="comfortable" class="text-body-2 text-muted">Documentation</v-btn>
        <v-menu>
          <template #activator="{ props: menuProps }">
            <v-btn
              v-bind="menuProps"
              variant="outlined"
              density="comfortable"
              icon="mdi-github"
              size="small"
              aria-label="LORT source code on GitHub"
            />
          </template>
          <v-list density="compact" min-width="220">
            <v-list-subheader>LORT SOURCE CODE</v-list-subheader>
            <v-list-item
              v-for="repo in githubRepos"
              :key="repo.url"
              :href="repo.url"
              target="_blank"
              rel="noopener noreferrer"
              :title="repo.label"
              :subtitle="repo.description"
            />
          </v-list>
        </v-menu>
      </div>

      <v-btn
        class="d-md-none"
        icon="mdi-menu"
        variant="text"
        aria-label="Open navigation"
        @click="drawer = true"
      />
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary location="right" width="280">
    <v-list nav density="comfortable">
      <v-list-item
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        :title="link.label"
        @click="drawer = false"
      />
      <v-divider class="my-2" />
      <v-list-item to="/docs" title="Documentation" @click="drawer = false" />
      <v-list-subheader>LORT SOURCE CODE</v-list-subheader>
      <v-list-item
        v-for="repo in githubRepos"
        :key="repo.url"
        :href="repo.url"
        target="_blank"
        rel="noopener noreferrer"
        :title="repo.label"
        :subtitle="repo.description"
        @click="drawer = false"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)

const navLinks = [
  { to: '/characters', label: 'Characters' },
  { to: '/movies', label: 'Movies' },
  { to: '/books', label: 'Books' },
  { to: '/quotes', label: 'Quotes' },
  { to: '/places', label: 'Places' },
  { to: '/races', label: 'Races' },
  { to: '/gods', label: 'Gods' }
]

const githubRepos = [
  { label: 'LORT App', description: 'Frontend — Vue/Vite', url: 'https://github.com/ayrtoncravero/lort-app' },
  { label: 'LORT API', description: 'Backend — NestJS', url: 'https://github.com/ayrtoncravero/lort-api' }
]
</script>

<style scoped>
.lort-mark {
  color: #c9a961;
  font-size: 1.25rem;
  line-height: 1;
}

.nav-link {
  opacity: 0.75;
}

.nav-link-active {
  opacity: 1;
  color: #c9a961 !important;
}
</style>
