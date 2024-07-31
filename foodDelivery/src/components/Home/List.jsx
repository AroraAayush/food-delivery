import React, { useState } from 'react'

import { useSelector } from 'react-redux';

import { FaAngleLeft,FaAngleRight } from "react-icons/fa";
import ItemsDisplay from './ItemsDisplay';

function List() {
  const [scrollValue,setScrollValue]=useState(0);
    console.log("rebuilding list components")
    // const [items,setItems]=useState(null);
    const items=useSelector((state)=>state.storeItems);
    console.log("Items from list component : ",items);
    
  return (
    <section className='w-full my-6'>
    <div className='w-full flex items-end justify-between'>
    <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg  before:w-32 before:h-1 before:left-0 before:-bottom-2 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all duration-100 ease-in-out'>
    Our Fresh & healthy fruits
    </p>
    <div className='hidden md:flex flex-row gap-3 mr-9'>
        <div className='bg-orange-300 hover:bg-orange-400 rounded-xl p-2' onClick={()=>{
          if(scrollValue<0)
            setScrollValue(1)
          else
          setScrollValue(scrollValue+1)
        }}><FaAngleLeft/></div>
        <div className='bg-orange-300 hover:bg-orange-400 rounded-xl p-2' onClick={()=>{
          if(scrollValue>0)
            setScrollValue(-1)
          else
          setScrollValue(scrollValue-1)
}}><FaAngleRight/></div>
        
    </div>
    </div>
    <ItemsDisplay data={items && items.filter((item)=>item.category!="fruits")
    } flag={false} scrollValue={scrollValue}/>

      
    </section>
  )
}

export default List
