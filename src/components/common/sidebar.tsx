'use client'

import Image from 'next/image'
import logo from '/public/logo-horizontal.svg'
import logoutIcon from '/public/logout.svg'
import { usePathname, useRouter } from 'next/navigation'
import LinkSidebar from './link-sidebar'
import { useAuthStore } from '@/store/authStore'
import { handleLogout, logoutRequest } from '@/service/auth'
import { CookieStorage } from '@/utils/cookies'

export default function Sidebar() {
  const pathname = usePathname()
  const { removeUser, user } = useAuthStore()
  const router = useRouter()

  async function logout() {
    const password = CookieStorage.get('password')

    if(!user?.email) return
    
    const payload: logoutRequest = {
      email: user.email,
      password
    }
    const res = await handleLogout(payload)
    if (res) {
      removeUser()
      router.push('/login')
    }
  }

  return (
    <div className='fixed h-full top-0 left-0 w-[222px] border-r border-[#DDE0E4] pt-[33px] pb-5 2xl:pb-[72px] flex flex-col items-center justify-between'>
      <div className='text-center'>
        <span>TEST QTI</span>
        <div className='mt-5 flex justify-center'>
          <Image src={logo} alt='logo' height={32} />
        </div>
        <div className='mt-[72px] flex flex-col gap-4 w-[167px]'>
          <LinkSidebar
            href='/'
            title='Home'
            page=''
            svg={
              <svg
                width='21'
                height='21'
                viewBox='0 0 21 21'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M18 4.25H3C2.66848 4.25 2.35054 4.3817 2.11612 4.61612C1.8817 4.85054 1.75 5.16848 1.75 5.5V7.375C1.75 7.70652 1.8817 8.02446 2.11612 8.25888C2.35054 8.4933 2.66848 8.625 3 8.625V15.5C3 15.8315 3.1317 16.1495 3.36612 16.3839C3.60054 16.6183 3.91848 16.75 4.25 16.75H16.75C17.0815 16.75 17.3995 16.6183 17.6339 16.3839C17.8683 16.1495 18 15.8315 18 15.5V8.625C18.3315 8.625 18.6495 8.4933 18.8839 8.25888C19.1183 8.02446 19.25 7.70652 19.25 7.375V5.5C19.25 5.16848 19.1183 4.85054 18.8839 4.61612C18.6495 4.3817 18.3315 4.25 18 4.25ZM16.75 15.5H4.25V8.625H16.75V15.5ZM18 7.375H3V5.5H18V7.375ZM8 11.125C8 10.9592 8.06585 10.8003 8.18306 10.6831C8.30027 10.5658 8.45924 10.5 8.625 10.5H12.375C12.5408 10.5 12.6997 10.5658 12.8169 10.6831C12.9342 10.8003 13 10.9592 13 11.125C13 11.2908 12.9342 11.4497 12.8169 11.5669C12.6997 11.6842 12.5408 11.75 12.375 11.75H8.625C8.45924 11.75 8.30027 11.6842 8.18306 11.5669C8.06585 11.4497 8 11.2908 8 11.125Z'
                  fill='currentColor'
                />
              </svg>
            }
          />
          <LinkSidebar
            href='/asset'
            title='Asset'
            page='asset'
            svg={
              <svg
                width='20'
                height='21'
                viewBox='0 0 20 21'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M17.0961 8.60717L10.8461 2.71029C10.843 2.70763 10.8402 2.70476 10.8375 2.7017C10.6074 2.49243 10.3075 2.37646 9.99648 2.37646C9.68545 2.37646 9.38558 2.49243 9.15547 2.7017L9.14688 2.71029L2.90391 8.60717C2.77656 8.72427 2.67491 8.86653 2.60538 9.02494C2.53586 9.18336 2.49997 9.35448 2.5 9.52748V16.7501C2.5 17.0817 2.6317 17.3996 2.86612 17.634C3.10054 17.8684 3.41848 18.0001 3.75 18.0001H7.5C7.83152 18.0001 8.14946 17.8684 8.38388 17.634C8.6183 17.3996 8.75 17.0817 8.75 16.7501V13.0001H11.25V16.7501C11.25 17.0817 11.3817 17.3996 11.6161 17.634C11.8505 17.8684 12.1685 18.0001 12.5 18.0001H16.25C16.5815 18.0001 16.8995 17.8684 17.1339 17.634C17.3683 17.3996 17.5 17.0817 17.5 16.7501V9.52748C17.5 9.35448 17.4641 9.18336 17.3946 9.02494C17.3251 8.86653 17.2234 8.72427 17.0961 8.60717ZM16.25 16.7501H12.5V13.0001C12.5 12.6686 12.3683 12.3507 12.1339 12.1163C11.8995 11.8818 11.5815 11.7501 11.25 11.7501H8.75C8.41848 11.7501 8.10054 11.8818 7.86612 12.1163C7.6317 12.3507 7.5 12.6686 7.5 13.0001V16.7501H3.75V9.52748L3.75859 9.51967L10 3.62514L16.2422 9.51811L16.2508 9.52592L16.25 16.7501Z'
                  fill='currentColor'
                />
              </svg>
            }
          />
        </div>
      </div>
      <button
        className='py-3 relative w-full lg:w-[167px] hover:bg-gray-100 rounded-md'
        onClick={logout}
      >
        <span>Logout</span>
        <Image
          src={logoutIcon}
          alt='logout'
          className='absolute top-1/2 -translate-y-1/2 right-[27px]'
        />
      </button>
    </div>
  )
}
