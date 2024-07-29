import React, { useState } from 'react'
import { IoMenu } from "react-icons/io5";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
function MobileMenu() {
  const [showMobileMenu,setMobileMenu]=useState(false)
  return (
    <div className='flex md:hidden relative items-center justify-center ml-11 '>
      <p onClick={()=>{setMobileMenu((prev)=>!prev)}
        
      }><IoMenu  className='text-3xl cursor-pointer'/></p>
      {showMobileMenu==true && <div className='absolute top-12 -right-12   bg-slate-200 z-10 flex flex-col w-36 rounded-sm shadow-sm'>
          {<Link to='/addnewItem' className='px-3 text-sm transition-all duration-100 ease-in-out py-3  flex items-center hover:bg-slate-300 cursor-pointer' onClick={()=>{setMobileMenu((prev)=>!prev)}}>Home</Link>}
          {<Link to='/addnewItem' className='px-3 text-sm transition-all duration-100 ease-in-out py-3  flex items-center hover:bg-slate-300 cursor-pointer' onClick={()=>{setMobileMenu((prev)=>!prev)}}>Menu</Link>}
          {<Link to='/addnewItem' className='px-3 text-sm transition-all duration-100 ease-in-out py-3  flex items-center hover:bg-slate-300 cursor-pointer' onClick={()=>{setMobileMenu((prev)=>!prev)}}>About Us</Link>}
          {<Link to='/addnewItem' className='px-3 text-sm transition-all duration-100 ease-in-out py-3  flex items-center hover:bg-slate-300 cursor-pointer' onClick={()=>{setMobileMenu((prev)=>!prev)}}>Services</Link>}
    
          
        </div>
}
    </div>
    
  )
}

export default MobileMenu

// {showMenu==true && <div className='absolute top-12 -right-12   bg-slate-200 z-10 flex flex-col w-36 rounded-sm shadow-sm'>
//   {user.email=="aroraaayush1111@gmail.com" && <Link to='/addnewItem' className='px-3 text-sm transition-all duration-100 ease-in-out py-3  flex items-center hover:bg-slate-300 cursor-pointer'>Add Item <IoMdAdd className='ml-5' /> </Link>}
//   <p onClick={handleLogout} className='px-3 text-sm  transition-all duration-100 ease-in-out py-3  flex items-center hover:bg-slate-300 cursor-pointer'>Logout <CiLogout className='ml-5'/></p>
  
// </div>
// }