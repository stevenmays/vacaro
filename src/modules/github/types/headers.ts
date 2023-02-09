import { AxiosResponseHeaders } from 'axios'

export interface Headers extends AxiosResponseHeaders {
  server: string
  date: string
  'content-type': string
  'transfer-encoding': string
  'cache-control': string
  vary: string
  etag: string
  'last-modified': string
  'github-authentication-token-expiration': string
  'x-github-media-type': string
  /** Conditionally returns when there are multiple pages */
  link?: string
  'x-github-api-version-selected': string
  'x-ratelimit-limit': string
  'x-ratelimit-remaining': string
  'x-ratelimit-reset': string
  'x-ratelimit-used': string
  'x-ratelimit-resource': string
  'access-control-expose-headers': string
  'access-control-allow-origin': string
  'strict-transport-security': string
  'x-frame-options': string
  'x-content-type-options': string
  'x-xss-protection': string
  'referrer-policy': string
  'content-security-policy': string
  'x-github-request-id': string
  connection: string
}
