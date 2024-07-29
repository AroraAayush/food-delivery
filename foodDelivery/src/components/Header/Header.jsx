import React from 'react'
import {DesktopMenu, MobileMenu,Logo,CartIcon, ProfileIcon} from '../index.js'

function Header() {
  return (
    <header className='fixed z-50 w-screen bg-slate-300 p-6 md:px-16 sm:px-10 px-7 flex flex-row items-center justify-between'>
        <Logo/>
        <DesktopMenu/>
      <div className='flex flex-row items-center'>
      <CartIcon/>
      <MobileMenu/>
      
      <ProfileIcon/>
      </div>
    </header>
  )
}

export default Header
