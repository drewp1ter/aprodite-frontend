const defaultConfig = {
  serverApiUrl: 'http://localhost:3000/api',
  clientApiUrl: 'http://localhost:3000/api'
}

export const config = assignDefined(defaultConfig, {
  serverApiUrl: process.env.SERVER_API_URL,
  clientApiUrl: process.env.NEXT_PUBLIC_CLIENT_API_URL
})

function assignDefined(target: any, ...sources: any) {
  for (const source of sources) {
    for (const key in source) {
      if (undefined === source[key]) continue
      target[key] = source[key]
    }
  }
  return target
}
