import type { ApiError } from './types'
import { normalizeErrorMessage } from './errorMessage'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export class ApiRequestError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}

type QueryParams = Record<string, string | number | undefined>

function buildQuery(params?: QueryParams): string {
  if (!params) return ''
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') search.set(key, String(value))
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

export function buildRequestUrl(path: string, params?: object): string {
  return `${BASE_URL}${path}${buildQuery(params as QueryParams | undefined)}`
}

export interface ApiRawResponse {
  status: number
  ok: boolean
  durationMs: number
  body: unknown
}

// Low-level call that never throws on HTTP error status — used by the API Explorer,
// which needs to display any status code/body, not just the happy path.
export async function apiGetRaw(path: string, params?: object): Promise<ApiRawResponse> {
  const url = buildRequestUrl(path, params)
  const startedAt = performance.now()

  let response: Response
  try {
    response = await fetch(url)
  } catch {
    throw new ApiRequestError(0, 'Could not reach the LORT API. Is it running and is CORS configured?')
  }

  const durationMs = Math.round(performance.now() - startedAt)

  let body: unknown = null
  try {
    body = await response.json()
  } catch {
    // response had no JSON body
  }

  return { status: response.status, ok: response.ok, durationMs, body }
}

export async function apiGet<T>(path: string, params?: object): Promise<T> {
  const { ok, status, body } = await apiGetRaw(path, params)
  if (!ok) {
    const errorBody = (body ?? {}) as Partial<ApiError>
    throw new ApiRequestError(status, normalizeErrorMessage(errorBody.message) || `Request failed with status ${status}`)
  }
  return body as T
}
