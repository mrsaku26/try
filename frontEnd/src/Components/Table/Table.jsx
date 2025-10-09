import React from 'react'
import './Table.css'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Table = ({blog,fetchBlogs,index}) => {

   const{title,createdAt}=blog;
   const blogDate=new Date(createdAt)

   const {axios} = useAppContext();

   const deleteBlog = async()=>{
    const confirm = window.confirm('Are you sure you want to delete this blog?')
    if(!confirm) return

    try {
      const {data} = await axios.post('/api/blog/delete',{id:blog._id})
      if(data.success){
        toast.success(data.message)
        await fetchBlogs()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
   }

   const togglePublish = async ()=>{
    try {
        const {data} = await axios.post('/api/blog/toggle-publish',{id:blog._id})
      if(data.success){
        toast.success(data.message)
        await fetchBlogs()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
   }

  return (
    <div className='table-data table-body'>
      <p>{index}</p>
      <p>{title}</p>
      <p>{blogDate.toDateString()}</p>
      <p className={blog.isPublished?'publish':'unpublish'}
      >{blog.isPublished ?'Published':"Unpublished"}</p>
      <button onClick={togglePublish}>{blog.isPublished ?'Unpublish':"Publish"}
      </button>
      <img onClick={deleteBlog} src={assets.cross_icon} alt="" />
    </div>
  )
}

export default Table
