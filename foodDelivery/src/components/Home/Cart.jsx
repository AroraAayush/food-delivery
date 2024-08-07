import React, { useEffect,useState} from 'react'
import { BiArrowBack } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import { motion } from 'framer-motion';
import { useSelector ,useDispatch} from 'react-redux';
import emptycart from '../../assets/emptyCart.svg'
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import { login,updateCartItem, updateCartShow,removeCartItem,updateCartTotal, clearCart } from '../../store/authSlice';
import { saveOrder } from '../../utils/firebaseFuncs';
import { app } from '../../firebase.config';
function Cart() {
  console.log("rebuilding cart")
  const dispatch=useDispatch();
  const stateCartShow=useSelector((state)=>state.cartShow);
  const user=useSelector((state)=>state.user)
  console.log("State cart status from cart : ",stateCartShow)
  // const [cart,setCart]=useState(false);
  const cartItems=useSelector((state)=>state.cartItems)

  const cartTotal=useSelector(state=>state.cartTotal);


  const getCountOfItem=(id)=>{
    const res=cartItems.filter((item)=>item.id==id)
    return res[0].qty;
  }

  const shopItems=()=>{
    const res={
      id:Date.now(),
      items:cartItems,
      amount:cartTotal+8.5,
      userId:user.uid
    }
    saveOrder(res);
    dispatch(clearCart());
    dispatch(updateCartShow(false))
  }

  const loginn=async()=>{
    const firebaseAuth=getAuth(app);
    const provider=new GoogleAuthProvider();

    const response=await signInWithPopup(firebaseAuth,provider);
    const userr=response.user.providerData[0];
    console.log("updating state now...");
    dispatch(login(userr));
    // setUser(userr);
    localStorage.setItem('user',JSON.stringify(userr));
  }

  return (
    <motion.div
    initial={{opacity:0 ,x:200}}
    animate={{opacity:1 ,x:0}}
    exit={{opacity:0 ,x:200}}
    transition={{duration:1.5,ease:"linear"}}
    className={`${stateCartShow?"flex":"hidden"} fixed top-[92px] right-0  min-w-350 w-370  h-[calc(100vh-40px)] z-50 bg-white rounded-l-xl   flex-col `}>
      <div className='w-full flex flex-row justify-between items-center h-10 p-3'>
        <BiArrowBack onClick={()=>{dispatch(updateCartShow(false))}}   className='w-10 h-5 cursor-pointer'/>
        <span className='text-headingColor text-base font-semibold'>Cart</span>
        <motion.div
        whileTap={{scale:0.8}}
        onClick={
          ()=>{dispatch(clearCart())}
        } className='flex flex-row justify-start items-center gap-1 text-gray-600 text-sm cursor-pointer'>
          <span>Clear</span>
          <MdClear className='h-4'/>

        </motion.div>
        
      </div>

      <div className={`h-[calc(100vh-132px)] ${cartItems.length>0?'bg-cartBg':"bg-white"} min-w-full w-full`}>

      
      
       <div className={`w-full ${cartItems.length>0?"h-[calc(100vh-380px)]":"h-full"}  bg-cartBg   p-3 rounded-t-3xl text-white `}> 
         <div className='flex gap-y-2 flex-col h-full overflow-y-scroll scrollbar-none justify-start border-2 border-neutral-700 p-2 '>
         {cartItems && cartItems.length>0 ? (cartItems.map((item)=>((<div className=' mx-1 shadow-lg border-2 border-neutral-700 rounded-xl flex flex-row justify-between   items-center p-2 gap-x-4'>
            <div className='flex flex-row justify-start items-center gap-x-2'>
              <div>
                <img src={item.photo} className='w-24'
 alt="" />
              </div>
              <div>
                <h4 className='text-base font-medium'>{item.title}</h4>
                <h6 className='font-light text-xs'> $ {item.price} X {item.qty} = ${Number(item.price)*Number(item.qty)}</h6>
              </div>

            </div>
            <div className='flex flex-row gap-x-2'>
              <motion.div whileTap={{scale:0.7}} className='w-5 h-5 text-black bg-white flex items-center cursor-pointer justify-center rounded-sm text-md' onClick={()=>
                {
                  const quantity=item.qty
                  const updatedItem={
                    id:item.id,
          qty:quantity+1,
          title:item.title,
          price:item.price,
          photo:item.photo
                  }
                  console.log("updated item : ",updatedItem)
                   dispatch(updateCartItem(updatedItem))
                   dispatch(updateCartTotal({task:"add",price:item.price}))
                  }
                  }>+</motion.div>
              <div className='w-5 h-5 text-black  bg-white flex items-center justify-center text-md rounded-sm p-2'>{item.qty}</div>
              <motion.div whileTap={{scale:0.7}} className='w-5 h-5 bg-white text-black flex items-center justify-center rounded-sm text-md cursor-pointer' onClick={()=>
                {
                  const quantity=item.qty
                  console.log(quantity)
                  
                  const updatedItem={
                    id:item.id,
          qty:quantity-1,
          title:item.title,
          price:item.price,
          photo:item.photo
                  }
                  console.log("updated item : ",updatedItem)
                  
                   dispatch(updateCartItem(updatedItem))
                   dispatch(updateCartTotal({task:"sub",price:item.price}))
                   if(quantity==1)
                    {
                      console.log("remove item from cart")
                      dispatch(removeCartItem(item.id));
                    }
                }
                  }>-</motion.div>

            </div>
          </div>))
)):(<div className='w-full h-full flex flex-col items-center justify-center gap-y-4'><img src={emptycart} alt="" />
No items added..</div>)}
          
         

         
          
        </div> 

        
       {cartItems && cartItems.length>0 && <div className='flex flex-col h-64  justify-center gap-y-4 bg-cartItem'>
          
        <div className='flex h-64 flex-col justify-center  gap-y-4 p-3'>
            <div className='flex flex-row justify-between'>
              <p className='font-normal text-base text-gray-400'>Sub Total</p>
              <p className='font-normal text-base text-gray-400'>{cartTotal}</p>
            </div>

            
            <div className='flex flex-row justify-between'>
              <p className='font-normal text-base text-gray-400'>Delivery</p>
              <p className='font-normal text-base text-gray-400'>$ 8.5</p>
            </div>

            <div className=' w-full  border-b my-2  bg-cardOverlay opacity-50'>

            </div>
            <div className='flex flex-row justify-between'>
              <p className='font-semibold text-base '> Total</p>
              <p className='font-semibold text-base'>$ {cartTotal+ 8.5}</p>
            </div>

            {user?
              
              (<motion.div whileTap={{scale:0.96}}  className='w-full cursor-pointer min-w-full text-center bg-gradient-to-tr from-orange-400 to-orange-600 rounded-2xl py-1' onClick={shopItems} >Check Out</motion.div>):((<motion.div whileTap={{scale:0.96}}  className='w-full cursor-pointer min-w-full text-center bg-gradient-to-tr from-orange-400 to-orange-600 rounded-2xl py-1' onClick={loginn} >Login to Check Out</motion.div>))}
            
          </div>

          
        </div>}


</div>






      </div>

    </motion.div>
  )
}

export default Cart
