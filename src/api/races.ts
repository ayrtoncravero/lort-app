import { apiGet } from './client'
import type { ApiPaginatedResponse, ApiRace, RaceListParams } from './types'

export const racesApi = {
  getAll(params: RaceListParams = {}) {
    return apiGet<ApiPaginatedResponse<ApiRace>>('/races', params)
  },
  getById(id: number) {
    return apiGet<ApiRace>(`/races/${id}`)
  }
}
