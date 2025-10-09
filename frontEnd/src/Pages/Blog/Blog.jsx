import React, { useEffect, useState } from 'react'
import './Blog.css'
import {useParams} from 'react-router-dom'
import {assets, blog_data, comments_data} from '../../assets/assets'
import Navbar from '../../Components/Navbar/Navbar'
import Moment from 'moment'
import Footer from '../../Components/Footer/Footer'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'


const Blog = () => {

  const {id}=useParams()

  const {axios} = useAppContext()

  const [data,setData]=useState(null)
  const [comment,setComment]=useState([])
  const[name,setName]=useState('')
  const[content,setContent]=useState('')

  const fetchBlogData=async()=>{
  try {
    const {data} = await axios.get(`/api/blog/${id}`)
    data.success ? setData(data.blog) : toast.error(data.message)
  } catch (error) {
    toast.error(error.message)
  }
  }

  const fetchComments=async()=>{
   try {
    const {data} = await axios.post('/api/blog/comments',{blogId:id})
    if(data.success){
      setComment(data.comments)
    }
   } catch (error) {
    toast.error(error.message)
   }
  }

  useEffect(()=>{
    fetchBlogData()
    fetchComments()
  },[])

  const addComment=async(e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post('/api/blog/add-comment',{blog:id,name,content});
      if(data.success){
        toast.success(data.message)
        setName('')
        setContent('')
        
      }else{
        toast.error(data.error)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return data? (
    <div>
      <Navbar/>
     <div className="blogs-inner">
       <div className="blogs-top">
        <p  className='date'>Published on {Moment(data.createdAt).format('Do MMMM YYYY')}</p>
        <h1 className='blogs-title'>{data.title}</h1>
        <p className='subtitle'>{data.subTitle}</p>
        <p className='author'>Mr Name</p>
      </div>
      <div className='blogs-lowers'>
        <img src={data.image} alt="" className='blogs-image'/>
        <div className='rich-text' dangerouslySetInnerHTML={{__html:data.description}}>

        </div>
        <div className="comments">
          <p>Comments ({comment.length})</p>
          <div className="comments-data">
            {
              comment.map((item,index)=>(
                <div key={index} className='comments-inner'>
                  <div className='comments-logo'>
                    <img src={assets.user_icon} alt="" className='comments-image'/>
                  <p>{item.name}</p>
                  </div>
                  <div className='comments-date'>
                    <p className='comments-content'>{item.content}</p>
                    <p>{Moment(item.createdAt).fromNow()}</p>
                  </div>
                   </div>

              ))
            }
          </div>
           <div className='add-comment'>
         <p>Add your comment</p>
         <form className='forms' onSubmit={addComment}>
          <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='Name' required />
          <textarea onChange={(e)=> setContent(e.target.value)} value={content} placeholder='Comment' name="" id="" required></textarea>
          <button className='submit' type='submit'>Submit</button>
         </form>
        </div>
        <div className="socialmedia-icon">
          <p>Share this article on social media</p>
          <div className='icons'>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.googleplus_icon} alt="" />
          </div>
        </div>
        </div>
       
      </div>
      <Footer/>
     </div>
    </div>
  ):<div>Loading...</div>
}

export default Blog
