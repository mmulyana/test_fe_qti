import Image from 'next/image'
import illustration from '/public/illustration.svg'

export default function Authlayout({ children }: React.PropsWithChildren) {
  return (
    <div className='grid grid-cols-2'>
      <div className='h-screen bg-[#2B8FEB] flex items-center justify-center'>
        <Image src={illustration} alt='illustration' height={560} />
      </div>
      <div className='flex flex-col justify-center items-center'>
        {children}
      </div>
    </div>
  )
}
