import React, { useEffect, useRef } from 'react'
import { IoBagAddSharp } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from '../../assets/NotFound.svg'
import { updateCartItem,addCartItem,removeCartItem, updateCartTotal } from '../../store/authSlice';
function ItemsDisplay({data,flag,scrollValue}) {
  
  console.log("building items display....")
  const rowContainerRef=useRef();
  const dispatch=useDispatch();
  const cartItemsList=useSelector((state)=>state.cartItems);
  console.log("Cart items updated : ",cartItemsList)
  useEffect(()=>{
    // console.log("Scroll Value is chaning : ",rowContainerRef.current.scroll);
    if(scrollValue>0)
    rowContainerRef.current.scrollLeft-=200;
  else
    rowContainerRef.current.scrollLeft+=200;

  },[scrollValue])

  const IsPresentInCart=(id)=>{
    const res=cartItemsList.filter((item)=>item.id==id)
    if(res.length>0)
      return true;
    else
    return false;
  }

  const getCountOfItem=(id)=>{
    const res=cartItemsList.filter((item)=>item.id==id)
    return res[0].qty;
  }


  return (
    <div ref={rowContainerRef} className={`mt-4 p-2 w-full  flex ${flag==true?"flex-wrap overflow-x-hidden justify-center ":"overflow-x-scroll scrollbar-none scroll-smooth" } bg-listbg gap-x-3`}>
        {data && data.length>0 ? (data.map((item)=>(
            <div  key={item.id} className={`${flag==true?"md:w-340 md:min-w-[340px] w-150 min-w-[150px]":"md:w-340 md:min-w-[340px] w-300 min-w-[300px] pr-6"} my-3 mx-1 md:w-340 md:min-w-[340px] w-300 min-w-[300px]  bg-cardOverlay shadow-md backdrop-blur-md hover:shadow-xl p-2  rounded-xl flex flex-col justify-between items-start border-1 border-neutral-500`}>
            <div className='w-full flex flex-row justify-between items-center'>
              <motion.img whileHover={{scale:1.2}} transition={{duration:0.3,
                ease:"linear"
              }} src={item.image} alt=""  className={`${flag==true?"min-w-[90px] w-24":"ml-4 min-w-[150px] w-44"}  mt-2  h-auto object-cover `}/>
      {cartItemsList && IsPresentInCart(item.id) ?
      (<div className='flex flex-row gap-x-2'>
              <motion.div whileTap={{scale:0.7}} className='w-5 h-5 text-white bg-cartTotal flex items-center cursor-pointer justify-center rounded-md text-md' onClick={()=>
                {
                  const quantity=Number(getCountOfItem(item.id))
                  const updatedItem={
                    id:item.id,
          qty:quantity+1,
          title:item.title,
          price:item.price,
          photo:item.image
                  }
                  console.log("updated item : ",updatedItem)
                   dispatch(updateCartItem(updatedItem))
                   dispatch(updateCartTotal({task:"add",price:item.price}))
                  }
                  }
                  >+</motion.div>
              <div className='w-5 h-5 text-white  bg-cartTotal flex items-center justify-center text-md rounded-md p-2'>{Number(getCountOfItem(item.id))}</div>
              <motion.div whileTap={{scale:0.7}} className='w-5 h-5 bg-cartTotal text-white flex items-center justify-center rounded-md text-md cursor-pointer' onClick={()=>
                {
                  const quantity=Number(getCountOfItem(item.id))
                  console.log(quantity)
                  
                  const updatedItem={
                    id:item.id,
          qty:quantity-1,
          title:item.title,
          price:item.price,
          photo:item.image
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
                  }
                  >-</motion.div>

            </div>)
            :(<IoBagAddSharp className={`${flag==true?"md:w-6 md:h-6 h-5 w-5":"w-6 h-6"} ` } onClick={()=>{
        const newItem={
          id:item.id,
          qty:1,
          title:item.title,
          price:item.price,
          photo:item.image
        }
        console.log("new item added : ",newItem);
        dispatch(addCartItem(newItem))
        dispatch(updateCartTotal({task:"add",price:item.price}))
        }
        }
        />)}
      
            </div>
      
            <div className='w-full flex flex-col items-end justify-end '>
              <h4 className='text-textColor font-semibold  text-base md:text-lg'>{item.title}</h4>
              <span className='mt-1 text-sm text-gray-500'>{item.calories} calories</span>
              <span className='mt-1 flex flex-row gap-1 items-center justify-end'><FaDollarSign className='text-md text-red-500'/> 
              <span className='text-lg text-headingColor font-semibold'>{item.price}</span>
              </span>      
              </div>
              </div>
        ))):(
          <div className='w-full flex flex-col justify-center items-center'>
            <img src={NotFound} alt="" className='w-40 h-40' />
            <p>Items Not Available</p>
          </div>
        )
      }
      {/* {!data || data.length==0 || <div> <img src={NotFound} alt="" /></div>  } */}
    </div>
  )
}

export default ItemsDisplay
