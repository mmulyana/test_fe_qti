'use client'

import { Data } from '@/components/common/bar-charts'
import Modal from '@/components/common/modal'
import Selectfield from '@/components/form/selectfield'
import Textfield from '@/components/form/textfield'
import {
  AssetRequest,
  deleteAsset,
  getAsset,
  updateAsset,
} from '@/service/asset'
import { getAssetByLocation, getAssetByStatus } from '@/service/home'
import { useLocationStore } from '@/store/locationStore'
import { useStatusStore } from '@/store/statusStore'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import img from '/public/modal.svg'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { status, setStatus } = useStatusStore()
  const { location, setLocation } = useLocationStore()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [isConfirm, setIsConfirm] = useState<boolean>(false)
  const [text, setText] = useState<string>('')

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

  useEffect(() => {
    async function getData() {
      const res = await getAsset(params.id)
      if (!res) return
      setValue('name', res?.name)
      setValue('location', res?.location.name)
      setValue('status', res?.status.name)
    }

    getData()
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

    const res = await updateAsset(payload, params.id)
    setText('Data has been Updated')
    setIsUpdate(true)
    setIsModalOpen(true)
    await delay(800)
    router.push('/asset')
  }

  function triggerSubmit() {
    handleSubmit(onSubmit)()
  }

  async function handleDelete() {
    const res = await deleteAsset(params.id)
    setText('Data has been Deleted')

    await delay(800)
    router.push('/asset')
  }

  function handleConfirmDelete() {
    setIsConfirm(true)
    handleDelete()
  }

  function triggerDelete() {
    setIsUpdate(false)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className='mt-11'>
        <p className='text-[#06122B] text-[28px] font-semibold'>
          Edit this form below
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
        </form>
        <div className='flex justify-end gap-3'>
          <button
            className='py-[10px] px-11 rounded-md text-[#FF6169] border-[1.4px] border-[#FF6169] hover:bg-[#FF6169] hover:text-white'
            onClick={triggerDelete}
          >
            Delete
          </button>
          <button
            className='py-[10px] px-11 rounded-md text-white bg-gradient-to-t from-[#278CEA] to-[#7DC1FF]'
            onClick={triggerSubmit}
          >
            Save Update
          </button>
        </div>
      </div>

      {!!isModalOpen && isUpdate && (
        <Modal>
          <Image src={img} alt='modal' />
          <p className='mt-4 font-semibold text-[27px]'>Success!</p>
          <p className='mt-3 text-2xl'>{text}</p>
        </Modal>
      )}
      {!!isModalOpen && !isUpdate && (
        <Modal>
          <div className='text-center'>
            <p className='mt-4 font-semibold text-[27px]'>Confirmation</p>
            <p className='mt-3 text-2xl max-w-[320px]'>
              Your action will cause this data permanently deleted.{' '}
            </p>
            <div className='mt-5 flex justify-center gap-4'>
              <button
                className='py-[10px] px-11 rounded-md text-[#FF6169] border-[1.4px] border-[#FF6169] hover:bg-[#FF6169] hover:text-white'
                onClick={() => {
                  setIsModalOpen(false)
                  setIsUpdate(false)
                }}
              >
                Delete
              </button>
              <button
                className='py-[10px] px-11 rounded-md text-white bg-gradient-to-t from-[#278CEA] to-[#7DC1FF]'
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
