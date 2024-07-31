import React, { useEffect, useRef } from 'react'
import { IoBagAddSharp } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { motion } from 'framer-motion';
import NotFound from '../../assets/NotFound.svg'
function ItemsDisplay({data,flag,scrollValue}) {
  const rowContainerRef=useRef();
  
  useEffect(()=>{
    // console.log("Scroll Value is chaning : ",rowContainerRef.current.scroll);
    if(scrollValue>0)
    rowContainerRef.current.scrollLeft-=200;
  else
    rowContainerRef.current.scrollLeft+=200;

  },[scrollValue])
  return (
    <div ref={rowContainerRef} className={`mt-4 p-2 w-full  flex ${flag==true?"flex-wrap overflow-x-hidden justify-center ":"overflow-x-scroll scrollbar-none scroll-smooth" } bg-listbg gap-x-3`}>
        {data && data.map((item)=>(
            <div  key={item.id} className={`${flag==true?"md:w-340 md:min-w-[340px] w-150 min-w-[150px]":"md:w-340 md:min-w-[340px] w-300 min-w-[300px] pr-6"} my-3 mx-1 md:w-340 md:min-w-[340px] w-300 min-w-[300px]  bg-cardOverlay shadow-md backdrop-blur-md hover:shadow-xl p-2  rounded-xl flex flex-col justify-between items-start border-1 border-neutral-500`}>
            <div className='w-full flex flex-row justify-between items-center'>
              <motion.img whileHover={{scale:1.2}} transition={{duration:0.3,
                ease:"linear"
              }} src={item.image} alt=""  className={`${flag==true?"min-w-[90px] w-24":"ml-4 min-w-[150px] w-44"}  mt-2  h-auto object-cover `}/>
      <IoBagAddSharp className={`${flag==true?"md:w-6 md:h-6 h-5 w-5":"w-6 h-6"}   `}/>
      
            </div>
      
            <div className='w-full flex flex-col items-end justify-end '>
              <h4 className='text-textColor font-semibold  text-base md:text-lg'>{item.title}</h4>
              <span className='mt-1 text-sm text-gray-500'>{item.calories} calories</span>
              <span className='mt-1 flex flex-row gap-1 items-center justify-end'><FaDollarSign className='text-md text-red-500'/> 
              <span className='text-lg text-headingColor font-semibold'>{item.price}</span>
              </span>      
              </div>
              </div>
        ))
      }
      {/* {!data || data.length==0 || <div> <img src={NotFound} alt="" /></div>  } */}
    </div>
  )
}

export default ItemsDisplay
