'use client'

import AssetItem from '@/components/common/asset-item'
import SearchField from '@/components/form/searchfield'
import searchAsset, { ResultAsset, getAllAsset } from '@/service/asset'
import { useStatusStore } from '@/store/statusStore'
import { FormEvent, useEffect, useState } from 'react'
import { If, Then, Else } from 'react-if'

export default function Page() {
  const [search, setSearch] = useState<string>('')
  const [data, setData] = useState<ResultAsset[]>([])

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
        <If condition={search === ''}>
          <Then>
            {data.map((data: any) => (
              <AssetItem key={data.id} data={data} />
            ))}
          </Then>
          <Else>
            {data
              .filter((d: ResultAsset) =>
                d.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((data: any) => (
                <AssetItem key={data.id} data={data} />
              ))}
          </Else>
        </If>
      </div>
    </>
  )
}
