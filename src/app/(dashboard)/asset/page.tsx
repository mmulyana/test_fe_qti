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
  const [page, setPage] = useState<number>(1)
  const [pageLength, setPageLength] = useState<number>(0)

  useEffect(() => {
    async function getData() {
      const res = await getAllAsset(page)
      setPageLength(res?.page_count as number)
      setData(res?.results as ResultAsset[])
    }

    getData()
  }, [])

  async function handleNavigation(type: string) {
    if (type === 'NEXT') {
      if (page < pageLength) {
        handleChangeNavigation(page + 1)
      }
    } else {
      if (page > 1) {
        handleChangeNavigation(page - 1)
      }
    }
  }

  async function handleChangeNavigation(page: number) {
    setPage(page)
    const res = await getAllAsset(page)
    setData(res?.results as ResultAsset[])
  }

  async function submit(e: FormEvent) {
    e.preventDefault()

    const res = await searchAsset(search)
    console.log(res)
    setData(res?.results as ResultAsset[])
    setPageLength(res?.page_count as number)
  }

  useEffect(() => {
    if (search !== '') return

    async function getData() {
      const res = await getAllAsset(page)
      setPageLength(res?.page_count as number)
      setData(res?.results as ResultAsset[])
    }

    if (search === '') {
      getData()
    }
  }, [search])

  function paginate() {
    let pagination = []
    for (let i = 0; i < pageLength; i++) {
      pagination.push(
        <div
          key={i}
          className={[
            'w-10 h-8 rounded flex justify-center items-center cursor-pointer text-sm',
            i == page - 1
              ? 'bg-gradient-to-t from-[#278CEA] to-[#7DC1FF] text-white'
              : 'bg-white hover:bg-gray-300',
          ].join(' ')}
          onClick={() => handleChangeNavigation(i + 1)}
        >
          {i + 1}
        </div>
      )
    }

    return pagination
  }

  return (
    <>
      <p className='text-xl font-semibold text-[#06122B] mt-[23px]'>
        List Asset
      </p>
      <div className='mt-3'>
        <form onSubmit={submit}>
          <SearchField value={search} setValue={setSearch} />
          <button type='submit' hidden />
        </form>
      </div>
      <div className='mt-3 pl-3 pr-4 pb-3 py-[10px] bg-white rounded-md max-h-[280px] overflow-x-auto'>
        {data.map((data: any) => (
          <AssetItem key={data.id} data={data} />
        ))}
      </div>
      <div className='mt-2 flex justify-end'>
        <div
          className='w-10 h-8 rounded flex justify-center items-center cursor-pointer hover:bg-gray-300'
          onClick={() => handleNavigation('PREV')}
        >
          {'<'}
        </div>
        <div className='flex gap-1 items-center'>{paginate()}</div>
        <div
          className='w-10 h-8 rounded flex justify-center items-center cursor-pointer hover:bg-gray-300'
          onClick={() => handleNavigation('NEXT')}
        >
          {'>'}
        </div>
      </div>
    </>
  )
}
