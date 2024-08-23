import { Outlet } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'

const AppLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  )
}

export default AppLayout
