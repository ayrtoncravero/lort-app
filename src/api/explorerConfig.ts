// Describes exactly the endpoints the real LORT API exposes, for the API Explorer only.
// Do not add endpoints here that the backend does not implement.

export interface ExplorerParam {
  name: string
  label: string
  type: 'string' | 'number'
}

export interface ExplorerEndpoint {
  id: string
  method: 'GET'
  /** Path template, may contain :id */
  path: string
  params: ExplorerParam[]
}

export interface ExplorerResource {
  id: string
  label: string
  endpoints: ExplorerEndpoint[]
}

const pageLimit: ExplorerParam[] = [
  { name: 'page', label: 'page', type: 'number' },
  { name: 'limit', label: 'limit', type: 'number' }
]

export const explorerResources: ExplorerResource[] = [
  {
    id: 'characters',
    label: 'Characters',
    endpoints: [
      {
        id: 'list',
        method: 'GET',
        path: '/characters',
        params: [
          { name: 'name', label: 'name', type: 'string' },
          { name: 'race', label: 'race', type: 'string' },
          { name: 'gender', label: 'gender', type: 'string' },
          ...pageLimit
        ]
      },
      { id: 'detail', method: 'GET', path: '/characters/:id', params: [{ name: 'id', label: 'id', type: 'number' }] }
    ]
  },
  {
    id: 'movies',
    label: 'Movies',
    endpoints: [
      {
        id: 'list',
        method: 'GET',
        path: '/movies',
        params: [{ name: 'name', label: 'name', type: 'string' }, ...pageLimit]
      },
      { id: 'detail', method: 'GET', path: '/movies/:id', params: [{ name: 'id', label: 'id', type: 'number' }] }
    ]
  },
  {
    id: 'books',
    label: 'Books',
    endpoints: [
      {
        id: 'list',
        method: 'GET',
        path: '/books',
        params: [{ name: 'name', label: 'name', type: 'string' }, ...pageLimit]
      },
      { id: 'detail', method: 'GET', path: '/books/:id', params: [{ name: 'id', label: 'id', type: 'number' }] }
    ]
  },
  {
    id: 'quotes',
    label: 'Quotes',
    endpoints: [
      {
        id: 'list',
        method: 'GET',
        path: '/quotes',
        params: [
          { name: 'movieId', label: 'movieId', type: 'number' },
          { name: 'characterId', label: 'characterId', type: 'number' },
          ...pageLimit
        ]
      },
      { id: 'detail', method: 'GET', path: '/quotes/:id', params: [{ name: 'id', label: 'id', type: 'number' }] }
    ]
  },
  {
    id: 'races',
    label: 'Races',
    endpoints: [
      {
        id: 'list',
        method: 'GET',
        path: '/races',
        params: [
          { name: 'name', label: 'name', type: 'string' },
          { name: 'type', label: 'type', type: 'string' },
          ...pageLimit
        ]
      },
      { id: 'detail', method: 'GET', path: '/races/:id', params: [{ name: 'id', label: 'id', type: 'number' }] }
    ]
  },
  {
    id: 'ainur',
    label: 'Ainur',
    endpoints: [
      {
        id: 'list',
        method: 'GET',
        path: '/ainur',
        params: [
          { name: 'name', label: 'name', type: 'string' },
          { name: 'type', label: 'type', type: 'string' },
          { name: 'characterId', label: 'characterId', type: 'number' },
          ...pageLimit
        ]
      },
      { id: 'detail', method: 'GET', path: '/ainur/:id', params: [{ name: 'id', label: 'id', type: 'number' }] }
    ]
  },
  {
    id: 'health',
    label: 'Health',
    endpoints: [{ id: 'status', method: 'GET', path: '/health', params: [] }]
  }
]

/** Resources described but not backed by a real endpoint yet — shown as disabled, never executable. */
export const explorerComingSoon: string[] = []
