import { apiGet } from './client'
import type { ApiPaginatedResponse, ApiQuote, QuoteListParams } from './types'

export const quotesApi = {
  getAll(params: QuoteListParams = {}) {
    return apiGet<ApiPaginatedResponse<ApiQuote>>('/quotes', params)
  },
  getById(id: number) {
    return apiGet<ApiQuote>(`/quotes/${id}`)
  }
}
