import { CookieKeys, CookieStorage } from '@/utils/cookies'
import http from '@/utils/http'

export interface LoginRequest {
  email: string
  password: string
}

export interface logoutRequest {
  email: string
  password: string
}

export type LoginResponse = {
  id: string
  email: string
  username: string
  is_active: boolean
  token: string
}

export async function handleLogin(
  payload: LoginRequest
): Promise<LoginResponse | undefined> {
  try {
    const res = await http.post('/auth/login', payload)
    return res.data
  } catch (error) {
    console.log(error)
    return
  }
}

export async function handleGetMe(): Promise<LoginResponse | undefined> {
  try {
    const res = await http('/auth/me')
    return res.data
  } catch (error) {
    console.log(error)
    return
  }
}

export async function handleLogout(payload: logoutRequest): Promise<boolean> {
  try {
    const res = await http.post('/auth/login', payload)

    if (res.status === 400) {
      throw Error('Bad request')
    }

    CookieStorage.remove(CookieKeys.AuthToken)
    CookieStorage.remove('password')
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
