import Sidebar from '@/components/common/sidebar'
import ProtectedRoute from '@/utils/protected-route'

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <ProtectedRoute>
      <Sidebar />
      <div className='ml-[222px] pt-[57px] px-5'>{children}</div>
    </ProtectedRoute>
  )
}
