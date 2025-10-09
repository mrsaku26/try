import React, { useState } from 'react'
import './Login.css'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { data } from 'react-router-dom'


const Login = () => {

  const {axios,setToken} = useAppContext()

  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')

  const handlesubmit=async(e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post('api/admin/login',{email,password})

      if(data.success){
        setToken(data.token)
        localStorage.setItem('token',data.token)
        axios.defaults.headers.common['Authorization'] = data.token
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
    <div className="logins">
      <div className="logins-inr">
        <h1><span>Admin</span> Login</h1>
        <p className='logins-p'>Enter your credentials to acess the admin pannel</p>
      </div>
      <form onSubmit={handlesubmit} className='logins-form'>
        <div className='logins-input'>
          <label htmlFor="email">Email</label>
        <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" name="" id="email" placeholder='your email id' required/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input onChange={(e)=> setPassword(e.target.value)} value={password}  type="password"  placeholder='your password' id='password' required/>
        </div>
        <button className='logins-btn' type='submit'>Login</button>
      </form>
    </div>
    </>
  )
}

export default Login
