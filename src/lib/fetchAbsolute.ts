import { config } from '@/config'
import { isServer } from './isServer'

export function fetchAbsolute(baseUrl: string) {
  return (url: string, init?: RequestInit) => (url.startsWith('/') ? fetch(baseUrl + url, init) : fetch(url, init))
}

export const fetchApi = fetchAbsolute(isServer() ? config.serverApiUrl : config.clientApiUrl)