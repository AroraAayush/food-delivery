import React, { useState } from 'react'
import { IoFastFoodOutline } from "react-icons/io5";
import { categories } from '../CreateItem/items';
import ItemsDisplay from './ItemsDisplay';
import { useSelector } from 'react-redux';

function Menu() {
    const data=useSelector((state)=>state.storeItems);
    const [filter,setFilter]=useState("chicken")
  return (
    <section className='w-full my-6 '>
        <div className='w-full flex items-end justify-between'>
    <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg  before:w-20 before:h-1 before:left-0 before:-bottom-2 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all duration-100 ease-in-out'>
    Our Menu
    </p>
        </div>
        
        <div className='mt-5 w-full  flex lg:justify-center justify-start  gap-5 overflow-x-scroll scrollbar-none'>
        
        {categories && categories.map((category)=>(
                
                <div key={category.id}  className={`${category.urlParamName==filter?"bg-red-600":"bg-cardOverlay"}  group hover:bg-red-600  shadow-md hover:shadow-lg flex flex-col rounded-lg justify-center items-center min-w-28 w-28 min-h-28 h-28 cursor-pointer transition-all duration-100 ease-in-out `} onClick={()=>{
                    console.log("filter changed ")
                    setFilter(category.urlParamName)}}>
                <div className={` ${category.urlParamName==filter?"bg-white text-black":"bg-red-600 text-white"}  p-3 group-hover:bg-white group-hover:text-black  rounded-full flex justify-center items-center`}><IoFastFoodOutline className='w-6 h-6'/></div>
                <div className={`${category.urlParamName==filter?"text-white":"text-headingColor"} mt-3 text-base group-hover:text-white  font-semibold capitalize`}>{category.name}</div>
                
             </div>
            ))}
        </div>

        <div className='mt-5'>
            <ItemsDisplay data={data && data.filter((item)=>item.category==filter)} flag={true} />
        </div>
        </section>
  )
}

export default Menu
