type Props = {
  name: string
  value: number
}
export default function StatusMatrik({ name, value }: Props) {
  return (
    <div className='px-3 py-2 rounded-md bg-white h-[83px] md:h-[120px] flex-1 w-full flex justify-between flex-col'>
      <p className='font-semibold text-[#818896] max-w-[72px] text-sm lg:text-base'>{name}</p>
      <p className='font-semibold text-[#06122B] text-sm lg:text-2xl'>{value}</p>
    </div>
  )
}
