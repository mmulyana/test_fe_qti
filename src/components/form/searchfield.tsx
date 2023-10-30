import Image from 'next/image'
import searchIcon from '/public/search.svg'

type Props = {
  value: string
  setValue: (e: string) => void
}

export default function SearchField({ value, setValue }: Props) {
  return (
    <div className='relative'>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Search asset'
        className='w-full py-[11px] border bg-[#ECF3FA] rounded-[5px] px-4 border-[#88C1F4] focus:outline-[#88C1F4]'
      />
      <Image
        src={searchIcon}
        alt='search'
        className='absolute top-1/2 -translate-y-1/2 right-4'
      />
    </div>
  )
}
