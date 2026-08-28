import { apiGet } from './client'
import type { ApiPaginatedResponse, ApiPlace, PlaceListParams } from './types'

export const placesApi = {
  getAll(params: PlaceListParams = {}) {
    return apiGet<ApiPaginatedResponse<ApiPlace>>('/places', params)
  },
  getById(id: number) {
    return apiGet<ApiPlace>(`/places/${id}`)
  }
}
