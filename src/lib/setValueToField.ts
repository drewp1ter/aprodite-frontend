// example: setValueToField(obj, 'key.nestedKey', 'value') => obj = { key: { nestedKey: 'value' } }

export function setValueToField(base: any, path: string, val: unknown) {
  const names = path.split('.')
  var lastName = names.pop()

  for (var i = 0; i < names.length; i++) {
    base = base[names[i]] = base[names[i]] || {}
  }

  if (lastName) base = base[lastName] = val
}
