'use client'

import { Data } from '@/components/common/bar-charts'
import Selectfield from '@/components/form/selectfield'
import Textfield from '@/components/form/textfield'
import { AssetRequest, createAsset } from '@/service/asset'
import { getAssetByLocation, getAssetByStatus } from '@/service/home'
import { useLocationStore } from '@/store/locationStore'
import { useStatusStore } from '@/store/statusStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

type formType = {
  name: string
  status: string
  location: string
}

const schema = z.object({
  name: z.string().min(1, 'This form is required'),
  status: z.string().min(1, 'This form is required'),
  location: z.string().min(1, 'This form is required'),
})

export default function Page() {
  const router = useRouter()
  const { status, setStatus } = useStatusStore()
  const { location, setLocation } = useLocationStore()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    async function handleGetAssetStatus() {
      const res = await getAssetByStatus()
      const newResult = res?.map((d) => ({
        id: d.status.id,
        name: d.status.name,
        count: d.count,
      })) as Data[]
      setStatus(newResult)
    }

    async function handleGetAssetLocation() {
      const res = await getAssetByLocation()
      const newResult = res?.map((d) => ({
        id: d.location.id,
        name: d.location.name,
        count: d.count,
      })) as Data[]
      setLocation(newResult)
    }

    if (status.length === 0) {
      handleGetAssetStatus()
    }

    if (location.length === 0) {
      handleGetAssetLocation()
    }
  }, [])

  const onSubmit: SubmitHandler<formType> = async (data) => {
    const statusData = status.find((d) => d.name === data.status)
    const locationData = location.find((d) => d.name === data.location)
    if (!statusData) return
    if (!locationData) return

    const payload: AssetRequest = {
      location_id: locationData?.id,
      name: data.name,
      status_id: statusData?.id,
    }

    const res = await createAsset(payload)
    router.push('/asset')
  }

  return (
    <>
      <div className='mt-11'>
        <p className='text-[#06122B] text-[28px] font-semibold'>
          Fill this form below
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mt-[38px] px-[10px] pb-10 flex flex-col gap-[18px]'>
            <Textfield
              errors={errors.name}
              label='Asset Name'
              register={register('name')}
              name='name'
              type='text'
              placeholder='Input name'
              autoComplete
            />
            <Selectfield
              errors={errors.status}
              label='Status'
              register={register('status')}
              name='status'
              type='text'
              placeholder='Select Status'
              value={watch('status')}
              setValue={setValue}
              data={status}
            />
            <Selectfield
              errors={errors.location}
              label='Location'
              register={register('location')}
              name='location'
              type='text'
              placeholder='Select Status'
              value={watch('location')}
              setValue={setValue}
              data={location}
            />
          </div>
          <button
            type='submit'
            className='block ml-auto py-[10px] px-11 rounded-md text-white bg-gradient-to-t from-[#278CEA] to-[#7DC1FF]'
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
