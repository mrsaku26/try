import React, { useEffect, useState } from 'react'
import './Listblog.css'
import { blog_data } from '../../assets/assets'
import Table from '../../Components/Table/Table'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Listblog = () => {

  const[blogs,setBlogs]=useState([])
  const {axios} =useAppContext()

  const fetchBlogs=async()=>{
   try {
    const {data} = await axios.get('/api/admin/blogs')
    if(data.success){
      setBlogs(data.blogs)
    }else{
      toast.error(data.message)
    }
   } catch (error) {
    toast.error(error.message)
   }
  }

  useEffect(()=>{
    fetchBlogs()
  },[])

  return (
    <div className='lstblog'>
      <h1>All blogs</h1>
      <div className="dashboard-table">
        <div className="table-data">
          <p>#</p>
          <p>Blog Title</p>
          <p>Date</p>
          <p>Status</p>
          <button>Actions</button>
          <p>Delete</p>
        </div>
        {
          blogs.map((blog,index)=>{
            return <Table key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index+1}/>
          })
        }
      </div>
    </div>
  )
}

export default Listblog
