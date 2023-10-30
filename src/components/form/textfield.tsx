import Image from 'next/image'

type Props = {
  label?: string
  name: string
  type: string
  register: any
  errors: any
  withoutLabel?: boolean
  icon?: HTMLImageElement
  placeholder: string
  autoComplete?: boolean
}
export default function Textfield({
  label,
  name,
  type,
  register,
  errors,
  icon,
  withoutLabel = false,
  placeholder,
  autoComplete = false,
}: Props) {
  return (
    <div>
      {!withoutLabel && (
        <label className='text-[#06122B] text-sm font-medium mb-2'>
          {label}
        </label>
      )}
      <div className='relative'>
        {!!icon && (
          <Image
            src={icon}
            alt='email icon'
            width={22}
            height={22}
            className='absolute left-4 top-1/2 -translate-y-1/2'
          />
        )}
        <input
          className={[
            'w-full py-[11px] border bg-[#ECF3FA] rounded-[5px]',
            icon ? 'pl-12' : 'px-4',
            errors
              ? 'border-[#FF434D] focus:outline-[#FF434D]'
              : 'border-[#88C1F4] focus:outline-[#88C1F4]',
          ].join(' ')}
          placeholder={placeholder}
          type={type}
          name={name}
          {...register}
          autoComplete={autoComplete ? 'off' : ''}
        />
        {errors && (
          <p className='absolute text-xs text-[#FF434D] -bottom-4'>
            {errors.message}
          </p>
        )}
      </div>
    </div>
  )
}
