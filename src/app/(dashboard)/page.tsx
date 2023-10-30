import AssetStatus from '@/components/asset-status'
import BarCharts from '@/components/common/bar-charts'
import LocationChart from '@/components/location-chart'
import LocationMatrikWrapper from '@/components/location-matrik-wrapper'
import ProfileUser from '@/components/profile-user'
import StatusMatrik from '@/components/status-matrik'
import StatusMatrikWrapper from '@/components/status-matrik-wrapper'

export default function Home() {
  return (
    <main className='pb-10'>
      <ProfileUser />
      <div className='mt-[23px]'>
        <p className='text-[32px] font-semibold'>Status</p>
        <div className='mt-5 flex flex-col-reverse md:grid lg:grid-cols-[1fr_200px] 2xl:grid-cols-[3fr_1fr] gap-5'>
          <div className='max-h-[400px] bg-white rounded-md pt-2 pb-8 overflow-x-auto overflow-y-hidden'>
            <AssetStatus />
          </div>
          <div className='h-full flex flex-row md:flex-col justify-between gap-[10px]'>
            <StatusMatrikWrapper />
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <p className='text-[32px] font-semibold'>Location</p>
        <div className='mt-4 flex flex-col-reverse md:grid lg:grid-cols-[1fr_200px] 2xl:grid-cols-[3fr_1fr] gap-5'>
          <div className='max-h-[400px] bg-white rounded-md pt-2 pb-8 overflow-x-auto overflow-y-hidden'>
            <LocationChart />
          </div>
          <div className='h-full flex flex-row md:flex-col justify-between gap-[10px]'>
            <LocationMatrikWrapper />
          </div>
        </div>
      </div>
    </main>
  )
}
