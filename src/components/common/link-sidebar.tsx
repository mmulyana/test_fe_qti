'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  href: string
  title: string
  page: string
  svg: React.ReactNode
}

export default function LinkSidebar({ href, page, svg, title }: Props) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={[
        'flex justify-center gap-1 w-full py-3 rounded-md',
        pathname.split('/')[1] == page
          ? 'bg-[#2B8FEB] hover:bg-[#3173de]'
          : 'hover:bg-gray-100',
      ].join(' ')}
    >
      <div className={pathname.split('/')[1] === page ? 'text-white' : 'text-[#818896]'}>
        {svg}
      </div>
      <span className={pathname.split('/')[1] == page ? 'text-white' : 'text-[#818896]'}>
        {title}
      </span>
    </Link>
  )
}
