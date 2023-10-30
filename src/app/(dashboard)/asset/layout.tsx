import ProfileUser from '@/components/profile-user'
import Image from 'next/image'
import Link from 'next/link'
import plusIcon from '/public/plus.svg'

export default function AssetLayout({ children }: React.PropsWithChildren) {
  return (
    <main className='pb-10'>
      <div className='flex justify-between'>
        <ProfileUser />
        <Link href='/asset/create' className='px-[30px] py-3 rounded-md bg-gradient-to-t from-[#278CEA] to-[#7DC1FF] flex items-center gap-x-0.5'>
          <Image src={plusIcon} alt='plus icon' />
          <p className='text-[#ECF3FA] font-medium'>Input Asset</p>
        </Link>
      </div>
      {children}
    </main>
  )
}
