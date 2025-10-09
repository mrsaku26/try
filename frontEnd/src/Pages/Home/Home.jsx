import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
 import Header from '../../Components/Header/Header'
import Bloglist from '../../Components/Bloglist/Bloglist'
import NewsLetter from '../../Components/NewsLetter/NewsLetter'
import Footer from '../../Components/Footer/Footer'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Header/>
      <Bloglist/>
      <NewsLetter/>
      <Footer/>
    </>
  )
}

export default Home
