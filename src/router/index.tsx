import { createBrowserRouter, Navigate } from 'react-router-dom'
import Error403 from '@/views/403'
import Error404 from '@/views/404'
import Login from '@/views/login/Login'

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
  },
  {
    path: 'login',
    element: <Login />
  }
]

export default createBrowserRouter(router)
