<template>
  <v-container class="py-10" style="max-width: 1200px">
    <div class="mb-8">
      <div class="text-overline text-muted mb-1">DOCUMENTATION</div>
      <h1 class="font-heading text-h3 font-weight-bold" style="color: #f1ede0">LORT API</h1>
    </div>

    <v-row>
      <v-col cols="12" md="3">
        <v-select
          v-model="section"
          :items="navItems"
          item-title="label"
          item-value="key"
          label="Section"
          hide-details
          density="comfortable"
          class="d-md-none mb-6"
        />

        <v-list nav density="compact" class="d-none d-md-block docs-nav" bg-color="transparent">
          <v-list-item title="Introduction" :active="section === 'intro'" @click="section = 'intro'" />
          <v-list-item title="Getting Started" :active="section === 'getting-started'" @click="section = 'getting-started'" />

          <template v-for="resource in explorerResources" :key="resource.id">
            <v-list-subheader>{{ docLabel(resource).toUpperCase() }}</v-list-subheader>
            <v-list-item
              v-for="endpoint in resource.endpoints"
              :key="endpoint.id"
              :title="endpointLabel(resource, endpoint)"
              :active="section === sectionKey(resource.id, endpoint.id)"
              @click="section = sectionKey(resource.id, endpoint.id)"
            />
          </template>

          <v-list-subheader>REFERENCE</v-list-subheader>
          <v-list-item title="Pagination" :active="section === 'pagination'" @click="section = 'pagination'" />
          <v-list-item title="Errors" :active="section === 'errors'" @click="section = 'errors'" />

          <v-divider class="my-2" style="border-color: var(--lort-border)" />
          <v-list-item title="API Explorer" prepend-icon="mdi-open-in-new" to="/explorer" />
        </v-list>
      </v-col>

      <v-col cols="12" md="9">
        <!-- Introduction -->
        <div v-if="section === 'intro'">
          <h2 class="font-heading text-h4 font-weight-bold mb-4" style="color: #f1ede0">Introduction</h2>
          <p class="text-body-1 text-muted mb-4">
            LORT is a read-only REST API for exploring the world of The Lord of the Rings — characters, movies,
            books and quotes. All responses are JSON. There is currently no authentication required.
          </p>
          <div class="mb-4">
            <div class="text-overline text-muted mb-1">Base URL (development)</div>
            <div class="d-flex align-center ga-3 flex-wrap">
              <code class="font-mono text-body-1" style="color: #e8dfc8">{{ baseUrl }}</code>
              <CopyButton :text="baseUrl" />
            </div>
            <p class="text-caption text-muted mt-2 mb-0">
              This is the local development server address, not a hosted production URL.
            </p>
          </div>
          <p class="text-body-1 text-muted mb-0">
            Available resources today: Characters, Movies, Books, Quotes, Places, Races, Ainur (Gods) and Health.
          </p>
        </div>

        <!-- Getting started -->
        <div v-else-if="section === 'getting-started'">
          <h2 class="font-heading text-h4 font-weight-bold mb-4" style="color: #f1ede0">Getting Started</h2>
          <p class="text-body-1 text-muted mb-6">
            Every collection endpoint returns a paginated envelope. Here's the simplest possible request.
          </p>

          <ApiEndpoint path="/api/characters" class="mb-4" />
          <div class="text-overline text-muted mb-2">Request</div>
          <ApiCodeBlock code="GET /api/characters" label="request" class="mb-6" />
          <div class="text-overline text-muted mb-2">Response</div>
          <JsonViewer :value="gettingStartedResponse" />
        </div>

        <!-- Pagination -->
        <div v-else-if="section === 'pagination'">
          <h2 class="font-heading text-h4 font-weight-bold mb-4" style="color: #f1ede0">Pagination</h2>
          <p class="text-body-1 text-muted mb-4">Collection endpoints share the same pagination envelope.</p>
          <v-table density="comfortable" class="mb-6 params-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-mono">data</td>
                <td class="text-muted">Array of results for the current page.</td>
              </tr>
              <tr>
                <td class="font-mono">page</td>
                <td class="text-muted">Current page number.</td>
              </tr>
              <tr>
                <td class="font-mono">limit</td>
                <td class="text-muted">Items per page. Accepts 1–100.</td>
              </tr>
              <tr>
                <td class="font-mono">total</td>
                <td class="text-muted">Total number of items across all pages.</td>
              </tr>
            </tbody>
          </v-table>
          <p class="text-body-1 text-muted mb-4">
            A page beyond the last one is <strong>not</strong> an error — it returns HTTP 200 with an empty
            <code class="font-mono">data</code> array.
          </p>
          <JsonViewer :value="paginationExample" />
        </div>

        <!-- Errors -->
        <div v-else-if="section === 'errors'">
          <h2 class="font-heading text-h4 font-weight-bold mb-4" style="color: #f1ede0">Errors</h2>
          <p class="text-body-1 text-muted mb-4">Errors share a consistent shape.</p>
          <v-table density="comfortable" class="mb-6 params-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-mono">statusCode</td>
                <td class="text-muted">HTTP status code.</td>
              </tr>
              <tr>
                <td class="font-mono">message</td>
                <td class="text-muted">
                  An array of strings describing the error (always an array, even for a single message).
                </td>
              </tr>
              <tr>
                <td class="font-mono">error</td>
                <td class="text-muted">Short error name (e.g. "Not Found").</td>
              </tr>
              <tr>
                <td class="font-mono">path</td>
                <td class="text-muted">The request path that failed.</td>
              </tr>
              <tr>
                <td class="font-mono">timestamp</td>
                <td class="text-muted">ISO timestamp of the error.</td>
              </tr>
            </tbody>
          </v-table>

          <div class="text-overline text-muted mb-2">404 — resource not found</div>
          <JsonViewer :value="notFoundExample" class="mb-6" />

          <div class="text-overline text-muted mb-2">400 — validation error</div>
          <JsonViewer :value="badRequestExample" />
        </div>

        <!-- Resource / endpoint pages -->
        <div v-else-if="currentEndpointDoc">
          <h2 class="font-heading text-h4 font-weight-bold mb-1" style="color: #f1ede0">{{ docLabel(currentResource!) }}</h2>
          <p class="text-body-1 text-muted mb-6">{{ currentEndpointDoc.description }}</p>

          <ApiEndpoint :path="`/api${currentEndpoint!.path}`" class="mb-6" />

          <template v-if="currentEndpoint!.params.length">
            <div class="text-overline text-muted mb-2">Query Parameters</div>
            <v-table density="comfortable" class="mb-6 params-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in currentEndpoint!.params" :key="p.name">
                  <td class="font-mono">{{ p.name }}</td>
                  <td class="text-muted">{{ p.type }}</td>
                  <td class="text-muted">{{ paramDocs[p.name]?.description ?? '' }}</td>
                </tr>
              </tbody>
            </v-table>
          </template>

          <div class="text-overline text-muted mb-2">Example Request</div>
          <ApiCodeBlock :code="currentEndpointDoc.requestExample" label="request" class="mb-6" />

          <div class="text-overline text-muted mb-2">Example Response</div>
          <JsonViewer :value="currentEndpointDoc.responseExample" class="mb-8" />

          <v-btn variant="outlined" prepend-icon="mdi-flask-outline" to="/explorer">Try it in Explorer</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { explorerResources, type ExplorerEndpoint, type ExplorerResource } from '@/api/explorerConfig'
import { docsContent, paramDocs } from '@/api/docsContent'
import ApiEndpoint from '@/components/ApiEndpoint.vue'
import ApiCodeBlock from '@/components/ApiCodeBlock.vue'
import JsonViewer from '@/components/JsonViewer.vue'
import CopyButton from '@/components/CopyButton.vue'

const baseUrl = import.meta.env.VITE_API_BASE_URL

function sectionKey(resourceId: string, endpointId: string) {
  return `${resourceId}:${endpointId}`
}

function docLabel(resource: ExplorerResource) {
  return resource.id === 'ainur' ? 'Ainur (Gods)' : resource.label
}

function endpointLabel(resource: ExplorerResource, endpoint: ExplorerEndpoint) {
  if (endpoint.id === 'list') return `List ${docLabel(resource).toLowerCase()}`
  if (endpoint.id === 'detail') return 'Get by ID'
  return docLabel(resource)
}

const navItems = [
  { key: 'intro', label: 'Introduction' },
  { key: 'getting-started', label: 'Getting Started' },
  ...explorerResources.flatMap((resource) =>
    resource.endpoints.map((endpoint) => ({
      key: sectionKey(resource.id, endpoint.id),
      label: `${docLabel(resource)} — ${endpointLabel(resource, endpoint)}`
    }))
  ),
  { key: 'pagination', label: 'Pagination' },
  { key: 'errors', label: 'Errors' }
]

const section = ref('intro')

const currentResource = computed<ExplorerResource | undefined>(() => {
  const [resourceId] = section.value.split(':')
  return explorerResources.find((r) => r.id === resourceId)
})

const currentEndpoint = computed<ExplorerEndpoint | undefined>(() => {
  const [, endpointId] = section.value.split(':')
  return currentResource.value?.endpoints.find((e) => e.id === endpointId)
})

const currentEndpointDoc = computed(() => {
  const resource = currentResource.value
  const endpoint = currentEndpoint.value
  if (!resource || !endpoint) return undefined
  return docsContent[resource.id]?.[endpoint.id]
})

const gettingStartedResponse = docsContent.characters.list.responseExample

const paginationExample = {
  data: [],
  page: 1,
  limit: 20,
  total: 19
}

const notFoundExample = {
  statusCode: 404,
  message: ['Character with id "999999" not found'],
  error: 'Not Found',
  path: '/api/characters/999999',
  timestamp: '2026-08-28T01:57:14.397Z'
}

const badRequestExample = {
  statusCode: 400,
  message: ['limit must not be greater than 100', 'limit must not be less than 1', 'limit must be an integer number'],
  error: 'Bad Request',
  path: '/api/characters?limit=abc',
  timestamp: '2026-08-28T01:57:14.404Z'
}
</script>

<style scoped>
.params-table {
  background: #141714;
  border: 1px solid var(--lort-border);
}
</style>
