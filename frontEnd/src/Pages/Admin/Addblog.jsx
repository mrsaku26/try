import React, {  useEffect, useState } from 'react'
import './Addblog.css'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useRef } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import {parse} from 'marked'

const Addblog = () => {

  const {axios} = useAppContext()
  const [isAdding,setIsAdding] = useState(false)
  const [loading,setLoading] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const[image,setImage]=useState(false)
  const[title,setTitle]=useState('')
  const[subTitle,setSubTitle]=useState('')
  const[category,setCategory]=useState('Startup')
  const[isPublished,setIsPublished]=useState(false)

  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    try {
      setIsAdding(true)

      const blog = {
        title,subTitle,
        description:quillRef.current.root.innerHTML,
        category,isPublished
      }

      const formData = new FormData()
      formData.append('blog',JSON.stringify(blog))
      formData.append('image',image)

      const {data} = await axios.post('/api/blog/add',formData)
      if(data.success){
        toast.success(data.message);
        setImage(false)
        setTitle('')
        quillRef.current.root.innerHTML =''
        setCategory('Startup')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsAdding(false)
    }
  }

  const generateConetnt = async()=>{
    if(!title) return toast.error('please enter a title')
    try {
      setLoading(true)
      const {data} = await axios.post('/api/blog/generate',{prompt:title})
      if(data.success){
        quillRef.current.root.innerHTML = parse(data.content)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(!quillRef.current && editorRef.current){
      quillRef.current=new Quill(editorRef.current,{theme:'snow'})
    }
  },[])

  return (
    <div className='addBlog'>
      <form onSubmit={onSubmitHandler}>
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img className='label-img' src={!image?assets.upload_area: URL.createObjectURL(image)} alt="" />
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden />
        </label>

        <p>Blog title</p>
        <input type="text" placeholder='Type here' onChange={(e)=>setTitle(e.target.value)}  value={title}/>

        <p>Sub title</p>
        <input type="text" placeholder='Type here' onChange={(e)=>setSubTitle(e.target.value)}  value={subTitle}/>

        <p>Blog Description</p>
        <div  className='editoref'> 
          <div ref={editorRef}>
          </div>
           <button disabled={loading} className='userefenc' onClick={generateConetnt}>{loading?"Loading...":"Generate with AI"}</button>
        </div>
       <div className='divs'>
        <p>Blog category</p>
       <select onChange={(e)=>setCategory(e.target.value)} name="" id="" value={category}>
         <option value="">Select category</option>
         {
          blogCategories.map((item,index)=>{
            return <option key={index} value={item}>{item}</option>
          })
         }
       </select>
      <div className="published">
         <p>Publish Now</p>
       <input type="checkbox" checked={isPublished} onChange={e=> setIsPublished(e.target.checked)} className='published-box'/>
      </div>
       </div>
       <button type='submit'>
        {isAdding ?'Adding...':'Add blog'}
       </button>
      </form>
    </div>
  )
}

export default Addblog
