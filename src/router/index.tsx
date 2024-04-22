import { createBrowserRouter, Navigate } from 'react-router-dom'
import Error403 from '@/views/403'
import Error404 from '@/views/404'

const router = [
  {
    path: '*',
    element: <Navigate to='404' />
  },
  {
    path: '403',
    element: <Error403 />
  },
  {
    path: '404',
    element: <Error404 />
  }
]

export default createBrowserRouter(router)
