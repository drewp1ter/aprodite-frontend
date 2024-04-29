const defaultConfig = {
  apiUrl: 'http://localhost:3000/api'
}

const { env } = process

export const config = assignDefined(defaultConfig, {
  apiUrl: env.API_URL
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
