import React, { useEffect, useState } from 'react'
import {DesktopMenu, MobileMenu,Logo,CartIcon, ProfileIcon} from '../index.js'

function Header() {
  const [menutype,setMenuType]=useState("none");
  
  const toggleMenuType=(type)=>{
    console.log("Toggling type to : ",type)
    setMenuType(type);
  }
  
  return (
    <header className='fixed z-50 w-screen bg-slate-300 p-6 md:px-16 sm:px-10 px-7 flex flex-row items-center justify-between'>
        <Logo/>
        <DesktopMenu/>
      <div className='flex flex-row items-center'>
      <CartIcon />
      <MobileMenu typee={menutype} toggleType={toggleMenuType}/>
      
      <ProfileIcon typee={menutype} toggleType={toggleMenuType}/>
      </div>
    </header>
  )
}

export default Header
