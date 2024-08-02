import React from 'react'
import Hero from './Hero'
import List from './List'
import Menu from './Menu'
import Cart from './Cart'

function Home() {
  return (
    <div id="home" className='lg:mx-8 mx-6 mt-6'>
      <Hero/>
      <List/>
      <Menu/>
      <Cart/>
      
        
    </div>
  )
}

export default Home
