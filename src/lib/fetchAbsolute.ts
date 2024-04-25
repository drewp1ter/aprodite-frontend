export function fetchAbsolute(baseUrl: string) {
  return (url: string, init?: RequestInit) => (url.startsWith('/') ? fetch(baseUrl + url, init) : fetch(url, init))
}

export const fetchApi = fetchAbsolute('http://localhost:3000/api')