import React from 'react'
import { FaCartShopping } from "react-icons/fa6";

function CartIcon() {
  return (
    <div className='relative'>
    <FaCartShopping className='text-black ml-3 text-xl'/>
    <div className=' absolute -top-3 -right-3 rounded-full bg-red-700 text-white text-sm w-5 h-5 p-1 flex items-center justify-center'>2</div>

    </div>
  )
}

export default CartIcon
