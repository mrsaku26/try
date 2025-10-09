import React from 'react'
import { assets } from '../../assets/assets'
import './CommentTable.css'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const CommentTable = ({comment,fetchComments}) => {

   const{blog,createdAt,_id}=comment
   const blogDate=new Date(createdAt)

   const {axios} = useAppContext()

   const approveComments =async ()=>{
      try {
         const {data} = await axios.post('/api/admin/approve-comment',{id:_id})
         if(data.success){
            toast.success(data.message)
            fetchComments()
         }else{
            toast.error(data.message)
         }
      } catch (error) {
         toast.error(error.message)
      }
   }

    const deleteComments =async ()=>{
      try {
         const confirm = window.confirm('Are you sure you want to delete this comment')
         if(!confirm) return;
         const {data} = await axios.post('/api/admin/delete-comment',{id:_id})
         if(data.success){
            toast.success(data.message)
            fetchComments()
         }else{
            toast.error(data.message)
         }
      } catch (error) {
         toast.error(error.message)
      }
   }


  return (
    <div className='comments-datas .cmtns-bod'>
      <div>
         <p className='cmnt-title cmnt-titl'>Blog : <span className='span'>{blog.title}</span></p>
         <p className='cmnt-title'>Name : <span className='span'>{comment.name}</span></p>
         <p className='cmnt-title cmnt-cmnt'>Comment : <span className='span'>{comment.content}</span></p>
      </div>
      <div>
         <p>{blogDate.toLocaleDateString()}</p>
      </div> 
      <div className='approvenot'>
         {
            !comment.isApproved?
            <img onClick={approveComments} className='cmnts-image im' src={assets.tick_icon}/>:<button className='approv'>Approved</button>
         }
         <img onClick={deleteComments} className='cmnts-image' src={assets.bin_icon} alt="" />
      </div>
    </div>
  )
}

export default CommentTable
