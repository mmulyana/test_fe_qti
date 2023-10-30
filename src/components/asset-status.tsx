'use client'

import { useAuthStore } from '@/store/authStore'
import BarCharts, { Data } from './common/bar-charts'
import { useEffect, useState } from 'react'
import { getAssetByStatus } from '@/service/home'
import { useStatusStore } from '@/store/statusStore'

export default function AssetStatus() {
  const { user } = useAuthStore()
  const { setStatus } = useStatusStore()
  const [data, setData] = useState<Data[] | []>([])

  useEffect(() => {
    if (!user) return

    async function handleGetAssetStatus() {
      const res = await getAssetByStatus()
      const newResult = res?.map((d) => ({
        id: d.status.id,
        name: d.status.name,
        count: d.count,
      })) as Data[]
      setData(newResult)
      setStatus(newResult)
    }

    handleGetAssetStatus()
  }, [user])

  return (
    <>
      <p className='pl-3 mb-4 font-semibold text-[#06122B]'>Chart</p>
      {data.length > 1 && (
        <BarCharts
          data={data}
          ticks={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
          barColor={['#00B6AC', '#FF7C45', '#FF6169']}
        />
      )}
    </>
  )
}
