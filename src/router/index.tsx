import { createBrowserRouter, Navigate } from 'react-router-dom'
import Error403 from '@/views/403'
import Error404 from '@/views/404'
import Login from '@/views/login/Login'
import DeptList from '@/views/system/dept'
import DashBoard from "@/views/dashboard"
import Layout from "@/layout"
import Index from "@/views/welcome"
import UserList from "@/views/system/user"
import MenuList from "@/views/system/menu";
import AuthLoader from "@/router/AuthLoader";

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
  },
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    id: 'layout',
    element: <Layout />,
    loader: AuthLoader,
    children: [
      {
        path: '/welcome',
        element: <Index />
      },
      {
        path: '/dashboard',
        element: <DashBoard />
      },
      {
        path: '/userList',
        element: <UserList />
      },
      {
        path: '/deptList',
        element: <DeptList />
      },
      {
        path: '/menuList',
        element: <MenuList />
      }
    ]
  }
]

export default createBrowserRouter(router)
