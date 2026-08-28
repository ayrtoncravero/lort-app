import { apiGet } from './client'
import type { AinurListParams, ApiAinur, ApiPaginatedResponse } from './types'

export const ainurApi = {
  getAll(params: AinurListParams = {}) {
    return apiGet<ApiPaginatedResponse<ApiAinur>>('/ainur', params)
  },
  getById(id: number) {
    return apiGet<ApiAinur>(`/ainur/${id}`)
  }
}
