import React from 'react'
import { useNavigate } from 'react-router-dom';
import './BlogCard.css'

const BlogCard = ({blog}) => {

   const {title,description,category,image,_id}=blog;
   const navigate=useNavigate()

  return (
    <div className='blg' onClick={()=>navigate(`/blog/${_id}`)}>
      <img src={image} alt="" className='blg-image'/>
      <span>{category}</span>
      <div className='blg-tops'>
         <h5 className='blg-title'>{title}</h5>
         <p className='blg-desc'>{description.slice(0,80)}</p>
      </div>
    </div>
  )
}

export default BlogCard
