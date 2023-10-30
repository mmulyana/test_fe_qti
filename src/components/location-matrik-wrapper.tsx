'use client'

import { useLocationStore } from '@/store/locationStore'
import StatusMatrik from './status-matrik'

export default function LocationMatrikWrapper() {
  const { location } = useLocationStore()
  return (
    <>
      {location
        ? location.map((d, index) => (
            <StatusMatrik key={index} name={d.name} value={d.count} />
          ))
        : [1, 2].map((d, index) => (
            <div className='flex-1 bg-gray-300 animate-ping' key={index} />
          ))}
    </>
  )
}
