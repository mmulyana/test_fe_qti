import Image from 'next/image'
import logo from '/public/logo.svg'
import FormLogin from './formLogin'

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-between'>
      <div className='flex flex-col items-center gap-[5px]'>
        <Image src={logo} alt='logo' width={32} height={32} />
        <h1 className='text-[54px] font-bold'>Welcome back!</h1>
        <span className='max-w-[245px] text-center font-medium text-xl'>
          You&apos;ve been missed, Please sign in your account{' '}
        </span>
      </div>
      <FormLogin />
    </div>
  )
}
