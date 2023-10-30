'use client'

import Image from 'next/image'
import avatar from '/public/avatar.png'
import chevronDownIcon from '/public/chevron-down.svg'
import { useAuthStore } from '@/store/authStore'

export default function ProfileUser() {
  const { user } = useAuthStore()
  return (
    <div className='flex items-center gap-1'>
      <div className='flex items-center gap-[10px]'>
        <Image src={avatar} alt='profile' width={40} height={40} />
        <div className='text-[#06122B] '>
          <p className='text-sm font-medium mb-[2px]'>{user?.username}</p>
          <p className='text-xs font-medium opacity-60'>{user?.email}</p>
        </div>
      </div>
      <button>
        <Image src={chevronDownIcon} alt='chevron down' />
      </button>
    </div>
  )
}
