import React from 'react'
import Logoo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
function Logo() {
  return (
    <Link to={'/'} className='flex flex-row items-center'>
      <img src={Logoo} alt="Logo" className='object-cover w-9' />
      <p className='px-2 font-semibold'>city</p>
    </Link>
  )
}

export default Logo
