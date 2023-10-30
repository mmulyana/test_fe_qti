export default function Modal({ children }: React.PropsWithChildren) {
  return (
    <div className='fixed top-0 left-0 h-full bg-[#06122B]/50 flex justify-center items-center w-full'>
      <div className='px-4 py-7 rounded-lg bg-white flex flex-col items-center text-[#06122B] w-[500px] max-w-full'>
        {children}
      </div>
    </div>
  )
}
