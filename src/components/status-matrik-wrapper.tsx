'use client'

import { useStatusStore } from '@/store/statusStore'
import StatusMatrik from './status-matrik'

const TITLE: {
  [key: string]: string
} = {
  Sold: 'Asset Sold',
  Stock: 'Asset in Stock',
  Asset: 'Expired Asset',
}

export default function StatusMatrikWrapper() {
  const { status } = useStatusStore()

  return (
    <>
      {status ? (
        <>
          <StatusMatrik
            name={TITLE[status[1]?.name]}
            value={status[1]?.count}
          />
          <StatusMatrik
            name={TITLE[status[2]?.name]}
            value={status[2]?.count}
          />
          <StatusMatrik
            name={TITLE[status[0]?.name]}
            value={status[0]?.count}
          />
        </>
      ) : (
        [1, 2, 3].map((d, index) => (
          <div className='flex-1 bg-gray-300 animate-ping' key={index} />
        ))
      )}
    </>
  )
}
