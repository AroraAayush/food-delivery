import React from 'react'

function DeskTopMenu() {
  return (
    <div className='md:flex hidden '>
      <span className='mx-6 text-textColor duration-100 ease-in-out transition-all cursor-pointer text-base hover:text-headingColor '  >Home</span>
      <span className='mx-6 text-textColor duration-100 ease-in-out transition-all cursor-pointer text-base hover:text-headingColor '>Menu</span>
      <span className='mx-6 text-textColor duration-100 ease-in-out transition-all cursor-pointer text-base hover:text-headingColor '>About Us</span>
      <span className='mx-6 text-textColor duration-100 ease-in-out transition-all cursor-pointer text-base hover:text-headingColor '>Services</span>
    </div>
  )
}

export default DeskTopMenu
