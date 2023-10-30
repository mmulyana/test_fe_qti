'use client'

import { useAuthStore } from '@/store/authStore'
import BarCharts, { Data } from './common/bar-charts'
import { useEffect, useState } from 'react'
import { getAssetByLocation } from '@/service/home'
import { useLocationStore } from '@/store/locationStore'

export default function LocationChart() {
  const { user } = useAuthStore()
  const { setLocation } = useLocationStore()

  const [data, setData] = useState<Data[] | []>([])

  useEffect(() => {
    if (!user) return

    async function handleGetAssetLocation() {
      const res = await getAssetByLocation()
      const newResult = res?.map((d) => ({
        id: d.location.id,
        name: d.location.name,
        count: d.count,
      })) as Data[]
      setData(newResult)
      setLocation(newResult)
    }

    handleGetAssetLocation()
  }, [user])

  return (
    <>
      <p className='pl-3 mb-4 font-semibold text-[#06122B]'>Chart</p>
      <BarCharts
        data={data}
        ticks={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
        barColor={['#00B6AC', '#FF7C45', '#FF6169']}
      />
    </>
  )
}
