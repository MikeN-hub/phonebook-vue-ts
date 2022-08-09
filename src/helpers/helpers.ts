export const mustBeLatin = (value: string) => {
  const regex = /[а-яА-Я]/
  return !value.match(regex)
}

export const mustBeDigits = (value: string) => {
  const regex = /[а-яА-Яa-zA-Z]/
  return !value.match(regex)
}

export const isValidHttpUrl = (str: string) => {
  let url
  try {
    url = new URL(str)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}
