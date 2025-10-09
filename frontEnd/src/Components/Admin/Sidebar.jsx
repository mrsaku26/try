import React from 'react'
import {NavLink} from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
       <NavLink end={true} to='/admin' className={({isActive})=> isActive ? 'sidebar-link active':''}>
         <img src={assets.home_icon} alt="" />
         <p className='sidebar-p'>Dashboard</p>
      </NavLink>

      <NavLink end={true} to='/admin/addBlog' className={({isActive})=> isActive ? 'sidebar-link active':''}>
         <img src={assets.add_icon} alt="" />
         <p className='sidebar-p'>Add blogs</p>
      </NavLink>

      <NavLink end={true} to='/admin/listBlog' className={({isActive})=> isActive ? 'sidebar-link active':''}>
         <img src={assets.list_icon} alt="" />
         <p className='sidebar-p'>Blog lists</p>
      </NavLink>
       <NavLink end={true} to='/admin/comments' className={({isActive})=> isActive ? 'sidebar-link active':''}>
         <img src={assets.list_icon} alt="" />
         <p className='sidebar-p'>Comments</p>
      </NavLink>
      
    </div>
  )
}

export default Sidebar
