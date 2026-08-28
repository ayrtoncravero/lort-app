import { apiGet } from './client'
import type { ApiCharacter, ApiPaginatedResponse, CharacterListParams } from './types'

export const charactersApi = {
  getAll(params: CharacterListParams = {}) {
    return apiGet<ApiPaginatedResponse<ApiCharacter>>('/characters', params)
  },
  getById(id: number) {
    return apiGet<ApiCharacter>(`/characters/${id}`)
  }
}
