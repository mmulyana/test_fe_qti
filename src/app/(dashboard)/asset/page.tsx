'use client'

import AssetItem from '@/components/common/asset-item'
import SearchField from '@/components/form/searchfield'
import { ResultAsset, getAllAsset } from '@/service/asset'
import { useStatusStore } from '@/store/statusStore'
import { useEffect, useState } from 'react'

export default function Page() {
  const [search, setSearch] = useState<string>('')
  const [data, setData] = useState<ResultAsset[]>([])
  const { status } = useStatusStore()

  useEffect(() => {
    async function getData() {
      const res = await getAllAsset()
      setData(res?.results as ResultAsset[])
    }

    getData()
  }, [])

  return (
    <>
      <p className='text-xl font-semibold text-[#06122B] mt-[23px]'>
        List Asset
      </p>
      <div className='mt-3'>
        <SearchField value={search} setValue={setSearch} />
      </div>
      <div className='mt-3 pl-3 pr-4 pb-3 py-[10px] bg-white rounded-md max-h-[360px] overflow-x-auto'>
        {data.map((data: any) => (
          <AssetItem key={data.id} data={data} />
        ))}
      </div>
    </>
  )
}
