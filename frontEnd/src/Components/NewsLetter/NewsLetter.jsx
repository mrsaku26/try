import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Never Miss a Blog!</h1>
      <p>Subscribe to get the latest blog, new tech, and exclusive news.</p>
      <form >
         <input type="text" placeholder='Enter your email id' />
         <button type='submit'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetter
