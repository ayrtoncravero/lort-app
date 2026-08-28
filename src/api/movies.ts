import { apiGet } from './client'
import type { ApiMovie, ApiPaginatedResponse, MovieListParams } from './types'

export const moviesApi = {
  getAll(params: MovieListParams = {}) {
    return apiGet<ApiPaginatedResponse<ApiMovie>>('/movies', params)
  },
  getById(id: number) {
    return apiGet<ApiMovie>(`/movies/${id}`)
  }
}
