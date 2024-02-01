import { nanoid } from 'nanoid'

export function kebabCaseToCamelCase(str: string) {
  return str.replace(/-./g, (x) => x[1].toUpperCase())
}

interface QueryParamPair {
  key: string
  value: string | number
}

export function upsertQueryParam(
  searchParams: URLSearchParams,
  key: string,
  value: string | number
) {
  const params = new URLSearchParams(searchParams)
  params.set(key, value.toString())

  return params.toString()
}

export function upsertQueryParams(
  searchParams: URLSearchParams,
  params: Record<string, string>
) {
  const result = new URLSearchParams(searchParams)

  for (const key in params) {
    if (!params[key] || params[key] === '') {
      result.delete(key)
      continue
    }

    result.set(key, params[key])
  }

  return result.toString()
}

export function shortid() {
  return nanoid(4)
}

export function invertColor(hex: string, bw?: boolean) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  const r_value = parseInt(hex.slice(0, 2), 16),
    g_value = parseInt(hex.slice(2, 4), 16),
    b_value = parseInt(hex.slice(4, 6), 16)

  let r = r_value.toString(16),
    g = g_value.toString(16),
    b = b_value.toString(16)

  if (bw) {
    return r_value * 0.299 + g_value * 0.587 + b_value * 0.114 > 186
      ? '#000000'
      : '#FFFFFF'
  }

  r = (255 - r_value).toString(16)
  g = (255 - g_value).toString(16)
  b = (255 - b_value).toString(16)

  function padZero(str: string, len?: number) {
    len = len || 2
    var zeros = new Array(len).join('0')
    return (zeros + str).slice(-len)
  }

  return '#' + padZero(r) + padZero(g) + padZero(b)
}
