import React from 'react'
import delivery from '../../assets/delivery.png'
import HeroBg from '../../assets/heroBg.png'
import fi1 from '../../assets/fi1.png'
import { lst } from './details'
function Hero() {
  return (
    <div className='flex md:flex-row flex-col gap-x-6 gap-y-10 md:justify-start md:items-center '>
    <div className='flex flex-col flex-1 justify-start items-start gap-y-6'>
    <div className='flex flex-row justify-start items-center  bg-orange-200 px-3 py-2 rounded-xl gap-x-2'>
    <span className='text-orange-600'>Bike Delivery</span>
    <img src={delivery} alt="Delivery" className='w-8 h-8 object-cover rounded-full bg-white p-1' />
    </div>
    <p className='text-headingColor md:text-[3.5rem] text-[2.5rem] font-bold tracking-wider w-full lg:max-w-[85%]'>The Fastest Delivery in <span className='md:text-[4.2rem] text-[3rem] text-orange-600'>Your City</span></p>
    <p className='text-textColor text-[1.2rem] w-full lg:max-w-[80%] text-left '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quaerat, tempore adipisci dolorem optio voluptatem. Tempora ullam, mollitia voluptatum, culpa harum suscipit aperiam reiciendis facere modi neque ducimus nemo nisi, in odit unde officia?</p>
    <button className='bg-orange-500 p-3 w-auto rounded-xl hover:shadow-lg transition-all ease-in-out duration-100'>Order Now</button>
    </div>
    <div className=' relative flex-1 items-center justify-center'>
     <img src={HeroBg} className='md:h-[600px] h-[450px] ml-auto mr-10 md:w-auto w-full' alt="" />
     <div className=' flex flex-wrap justify-center items-center gap-x-6 gap-y-10 md:gap-4 lg:gap-x-6 absolute top-5 lg:left-0 left:0 w-full h-full '>

       { lst && lst.map((item)=>(
         
         <div key={item.id} className='lg:p-6 p-3 drop-shadow-xl bg-cardOverlay backdrop-blur-xl rounded-2xl lg:min-w-48 lg:max-w-[220px] min-w-32 max-w-40 lg:mt-10 mt-3'>
       <div className=' flex flex-col items-center justify-center '> 
         <img src={item.photo} className='w-20 h-20 -mt-16 mb-4' alt="" />
         <h4 className='font-semibold text-headingColor text-base mb-4'>{item.title}</h4>
         <p className='md:block hidden text-center mb-4'>{item.desc}</p>
         <span className='text-red-500 font-bold'>$  <span className='text-black'>{item.price}</span></span>
       </div>
       </div>
       ))}
       

                                               </div>

    </div>
     
             </div>
  )
}

export default Hero
