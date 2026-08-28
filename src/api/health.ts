import { apiGet } from './client'
import type { ApiHealth } from './types'

export const healthApi = {
  getStatus() {
    return apiGet<ApiHealth>('/health')
  }
}
