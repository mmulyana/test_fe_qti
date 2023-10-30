import Image from 'next/image'
import chevronDown from '/public/chevron-down.svg'
import { useEffect, useRef, useState } from 'react'
import { Data } from '../common/bar-charts'

type Props = {
  label: string
  name: string
  type: string
  register: any
  errors: any
  withoutLabel?: boolean
  placeholder: string
  value: string
  setValue: (...arg: any) => void
  data: any
}
export default function Selectfield({
  label,
  name,
  type,
  register,
  errors,
  withoutLabel = false,
  placeholder,
  value = '',
  setValue,
  data,
}: Props) {
  const inputRef = useRef(null) as any
  const [isFocus, setIsFocus] = useState<boolean>(false)

  function handleKeyDown(e: KeyboardEvent) {
    const { key } = e
    if (key === 'Escape') {
      setIsFocus(false)
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsFocus(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative h-fit' ref={inputRef}>
      {!withoutLabel && (
        <label className='text-[#06122B] text-sm font-medium mb-2'>
          {label}
        </label>
      )}
      <div className='relative'>
        <Image
          src={chevronDown}
          alt='chevron icon'
          width={22}
          height={22}
          className='absolute right-4 top-1/2 -translate-y-1/2'
        />
        <input
          onKeyDown={handleKeyDown}
          className={[
            'w-full py-[11px] border bg-[#ECF3FA] rounded-[5px] px-4',
            errors
              ? 'border-[#FF434D] focus:outline-[#FF434D]'
              : 'border-[#88C1F4] focus:outline-[#88C1F4]',
          ].join(' ')}
          placeholder={placeholder}
          type={type}
          name={name}
          {...register}
          onFocus={() => setIsFocus(true)}
          autoComplete="off"
        />
        {errors && (
          <p className='absolute text-xs text-[#FF434D] -bottom-4'>
            {errors.message}
          </p>
        )}
      </div>
      {isFocus ? (
        <div className='w-full h-fit bg-[#ECF3FA] absolute -bottom-2 left-0 z-10 translate-y-full rounded-[5px] overflow-hidden'>
          {data
            .filter((d: Data) =>
              d.name.toLowerCase().includes(value.toLowerCase())
            )
            .map((d: Data, index: number) => (
              <div
                key={index}
                className='px-4 py-[9px] hover:bg-[#dee7f1] cursor-pointer'
                onClick={() => {
                  setValue(name, d.name)
                  setIsFocus(false)
                }}
              >
                <span>{d.name}</span>
              </div>
            ))}
        </div>
      ) : null}
    </div>
  )
}
