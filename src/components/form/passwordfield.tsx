import Image from 'next/image'
import passwordIcon from '/public/mdi_lock-outline.svg'
import eyeVisibleIcon from '/public/eye-invisible-filled.svg'
import { useState } from 'react'

type Props = {
  name: string
  register: any
  errors: any
}

export default function Passwordfield({ name, register, errors }: Props) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  return (
    <div className='relative'>
      <Image
        src={passwordIcon}
        alt='password icon'
        width={22}
        height={22}
        className='absolute left-4 top-1/2 -translate-y-1/2'
      />
      <div onClick={() => setIsShowPassword(!isShowPassword)}>
        <Image
          src={eyeVisibleIcon}
          alt='email icon'
          width={22}
          height={22}
          className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
        />
      </div>
      <input
        className={[
          'w-full py-[11px] border bg-[#ECF3FA] rounded-[5px] pl-12',
          errors
            ? 'border-[#FF434D] focus:outline-[#FF434D]'
            : 'border-[#88C1F4] focus:outline-[#88C1F4]',
        ].join(' ')}
        type={isShowPassword ? 'text' : 'password'}
        name={name}
        placeholder='Password'
        {...register}
      />
      {errors && (
        <p className='absolute text-xs text-[#FF434D] -bottom-4'>
          {errors.message}
        </p>
      )}
    </div>
  )
}
