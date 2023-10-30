import Image from 'next/image'
import Link from 'next/link'
import pencilIcon from '/public/pencil.svg'

type Props = {
  data: {
    name: string
    id: string
  }
}

export default function AssetItem({ data }: Props) {
  return (
    <div className='p-3 border-b border-[#d6dcec] flex justify-between items-center'>
      <div>
        <p className='text-[#818896] text-sm font-medium mb-0.5'>Asset Name</p>
        <p className='text-[#06122B] font-semibold'>{data.name}</p>
      </div>
      <Link
        href={`/asset/edit/${data.id}`}
        className='w-8 h-8 rounded-full bg-gradient-to-t from-[#278CEA] to-[#7DC1FF] flex justify-center items-center'
      >
        <Image src={pencilIcon} alt='pencil icon' />
      </Link>
    </div>
  )
}
