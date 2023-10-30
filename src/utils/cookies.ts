import Cookies from 'universal-cookie'

export const CookieKeys = {
  AuthToken: 'authToken',
}

const cookies = new Cookies()

const CookieOptions = {
  path: '/',
  secure: true,
}

export const CookieStorage = {
  set: (key: string, data: any, options?: any) => {
    return cookies.set(key, data, { ...CookieOptions, ...options })
  },
  get: (key: string, options?: any) => {
    return cookies.get(key, { ...CookieOptions, ...options })
  },
  remove: (key: string, options?: any) => {
    return cookies.remove(key, { ...CookieOptions, ...options })
  },
}
