import { apiGet } from './client'
import type { ApiBook, ApiPaginatedResponse, BookListParams } from './types'

export const booksApi = {
  getAll(params: BookListParams = {}) {
    return apiGet<ApiPaginatedResponse<ApiBook>>('/books', params)
  },
  getById(id: number) {
    return apiGet<ApiBook>(`/books/${id}`)
  }
}
