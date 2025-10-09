import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets'
import './Comments.css'
import CommentTable from '../../Components/Admin/CommentTable'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {

  const[comments,setComments]=useState([])
  const[filter,setFilter]=useState('Not Approved')

  const {axios} = useAppContext()

  const fetchComments=async()=>{
   try {
    const {data} = await axios.get('/api/admin/comments')
    data.success ? setComments(data.comments) :toast.error(data.message)
   } catch (error) {
    toast.error(error.message)
   }
  }

  useEffect(()=>{
    fetchComments()
  },[])

  return (
    <div className='admin-cmt'>
      <div className="cmt-data">
        <p>Comments</p>
        <div>
          <button onClick={()=> setFilter('Approved')} className='approved'>Approved</button>
          <button onClick={()=> setFilter('Not Approved')}>Not Approved</button>
        </div>
      </div>
      <div className="box-shadow">
        <div className="comments-datas">
       <div>
         <p>BLOG TITLE & COMMENT</p>
       </div>
        <div>
          <p>DATE</p>
        </div>
        <div><p>ACTIONS</p></div>
      </div>
      {
        comments.filter(comment => filter === 'Approved' ? comment.isApproved : !comment.isApproved).map((comment,index)=> <CommentTable key={comment._id} comment={comment} index={index+1} fetchComments={fetchComments}/>)
      }
      </div>
    </div>
  )
}

export default Comments
