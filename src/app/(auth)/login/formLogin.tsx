'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import emailIcon from '/public/mdi_email-outline.svg'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import Textfield from '@/components/form/textfield'
import Passwordfield from '@/components/form/passwordfield'
import { LoginRequest, handleLogin } from '@/service/auth'
import { jwtDecode } from 'jwt-decode'
import { CookieKeys, CookieStorage } from '@/utils/cookies'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

type formType = {
  email: string
  password: string
}

const schema = z.object({
  email: z.string().min(1, 'This form is required'),
  password: z.string().min(1, 'This form is required'),
})

export default function FormLogin() {
  const { addUser } = useAuthStore()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<formType> = async (data) => {
    const payload: LoginRequest = {
      email: data.email,
      password: data.password,
    }
    const res = await handleLogin(payload)
    if (!res) return
    onSuccess(res.token, payload.password)
    addUser(res)

    router.push('/')
  }

  const onSuccess = (token: string, password: string) => {
    const data = jwtDecode(token)
    if (!data?.exp) return

    CookieStorage.set(CookieKeys.AuthToken, token, {
      expires: new Date(data.exp * 1000),
    })

    CookieStorage.set('password', password)
  }

  return (
    <div className='px-[10px] py-[18px] flex flex-col mt-20 w-[308px] max-w-full'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-[18px]'>
          <Textfield
            errors={errors.email}
            label='Asset Name'
            register={register('email')}
            name='email'
            type='text'
            placeholder='Email'
            withoutLabel
            icon={emailIcon}
          />
          <Passwordfield
            name='password'
            register={register('password')}
            errors={errors.password}
          />
        </div>
        <button
          type='submit'
          className='mt-[70px] w-full bg-gradient-to-t from-[#278CEA] to-[#7DC1FF] text-white font-medium py-[10px] rounded-[5px]'
        >
          Login
        </button>
      </form>
    </div>
  )
}
