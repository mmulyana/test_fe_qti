import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { CookieKeys, CookieStorage } from './cookies'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers ?? {}
    const token = CookieStorage.get(CookieKeys.AuthToken)
    config.headers.Authorization = `Bearer ${token ?? ''}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http
