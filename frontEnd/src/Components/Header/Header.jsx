import React, { useRef } from 'react'
import './Header.css'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const Header = () => {

  const {setInput,input} =useAppContext()
  const inputRef = useRef()

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  return (
    <div className='header'>
      <div className='header-top'>
         <div className='header-mid'>
            <p>New: AI feature integrated</p>
            <img src={assets.star_icon} alt="" />
         </div>
         <h1>Your own <span> blogging</span> <br /> platform.</h1>

         <p className='desc'>This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.</p>

        <form onSubmit={onSubmitHandler}>
         <input ref={inputRef} type="text" placeholder='Search for Blogs' required/>
         <button type='submit'>Submit</button>
        </form>
      </div>
      <img src={assets.gradientBackground} alt="" className='gradient'/>
    </div>
  )
}

export default Header
