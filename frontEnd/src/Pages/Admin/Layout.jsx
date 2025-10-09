import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import './Layout.css'
import Sidebar from '../../Components/Admin/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

  const {axios,setToken,navigate}=useAppContext()

  const logout=()=>{
    localStorage.removeItem('token')
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null)
    navigate('/')
  }

  return (
    <>
    <div className="layout">
      <div className="layout-inner">
        <img src={assets.logo} alt="" onClick={()=> navigate('/')}/>
      <button onClick={logout}>Logout</button>
      </div>
    </div>
    <div>
      <Sidebar/>
      <Outlet/>
    </div>
    </>
  )
}

export default Layout
