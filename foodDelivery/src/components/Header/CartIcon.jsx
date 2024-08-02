import React, { useEffect, useState } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { updateCartShow } from '../../store/authSlice';
import { useDispatch ,useSelector} from 'react-redux';
function CartIcon({setCartStatus}) {
  const statestatus=useSelector((state)=>state.cartShow);
  

  const products=useSelector((state)=>state.cartItems);



  const dispatch=useDispatch();
  
  return (
    <div onClick={()=>{dispatch(updateCartShow(!statestatus))}} className='relative'>
    <FaCartShopping  className='text-black ml-3 text-xl'/>
    {products.length>0 && <div className=' absolute -top-3 -right-3 rounded-full bg-red-700 text-white text-sm w-5 h-5 p-1 flex items-center justify-center'>{products.length}</div>
}
    </div>
  )
}

export default CartIcon
