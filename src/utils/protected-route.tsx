'use client'

import { useEffect, useState } from 'react'
import { User, useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { CookieKeys, CookieStorage } from '@/utils/cookies'
import { handleGetMe } from '@/service/auth'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { user, addUser } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const token = CookieStorage.get(CookieKeys.AuthToken)
    if (!token) {
      router.push('/login')
    }

    async function getMe() {
      const res = await handleGetMe()
      const payload = { ...res } as User
      addUser(payload)
      await delay(800)
      setIsLoading(false)
    }

    getMe()
  }, [])

  if (isLoading) {
    return null
  }

  return <>{children}</>
}
