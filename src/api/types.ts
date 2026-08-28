// Types reflect the real LORT API V1 contract, not the mock data shape.

export interface ApiPaginatedResponse<T> {
  data: T[]
  page: number
  limit: number
  total: number
}

export interface ApiError {
  statusCode: number
  message: string[]
  error: string
  path: string
  timestamp: string
}

export interface ApiCharacter {
  id: number
  name: string
  race: string
  gender: string | null
  birth: string | null
  death: string | null
  hair: string | null
  height: string | null
  realm: string | null
  spouse: string | null
  wikiUrl: string | null
}

export interface ApiMovie {
  id: number
  name: string
  releaseYear: number
  runtimeInMinutes: number
  budgetInMillions: number
  boxOfficeRevenueInMillions: number
  academyAwardNominations: number
  academyAwardWins: number
  rottenTomatoesScore: number
}

export interface ApiBook {
  id: number
  name: string
  author: string
  releaseYear: number
}

export interface ApiQuoteCharacterRef {
  id: number
  name: string
}

export interface ApiQuoteMovieRef {
  id: number
  name: string
}

export interface ApiQuote {
  id: number
  dialog: string
  character: ApiQuoteCharacterRef | null
  movie: ApiQuoteMovieRef | null
}

export interface ApiHealth {
  status: string
}

export interface CharacterListParams {
  page?: number
  limit?: number
  name?: string
  race?: string
  gender?: string
}

export interface MovieListParams {
  page?: number
  limit?: number
  name?: string
}

export interface BookListParams {
  page?: number
  limit?: number
  name?: string
}

export interface QuoteListParams {
  page?: number
  limit?: number
  movieId?: number
  characterId?: number
}

export interface ApiPlace {
  id: number
  name: string
  type: string
  parentId: number | null
  wikiUrl: string | null
}

export interface PlaceListParams {
  page?: number
  limit?: number
  name?: string
  type?: string
}

export interface ApiRace {
  id: number
  name: string
  type: string
  parentId: number | null
  wikiUrl: string | null
}

export interface RaceListParams {
  page?: number
  limit?: number
  name?: string
  type?: string
}

export interface ApiAinur {
  id: number
  name: string
  type: string
  characterId: number | null
  wikiUrl: string | null
}

export interface AinurListParams {
  page?: number
  limit?: number
  name?: string
  type?: string
  characterId?: number
}
