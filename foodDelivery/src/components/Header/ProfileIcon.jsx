import React from 'react'
import avatar from '../../assets/avatar.png'
import { motion } from 'framer-motion'
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import { app } from '../../firebase.config'
import { login,logout } from '../../store/authSlice'
import { useDispatch ,useSelector } from 'react-redux'
import { useEffect,useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom'
function ProfileIcon({typee,toggleType}) {

const stateVar=useSelector((state)=>state.user)
const [user,setUser]=useState(null);

const [showMenu,setShowMenu]=useState(false);
useEffect(()=>{
  console.log("state var updated : ",stateVar);
  if(typee=="mobile")
  {
    setShowMenu(false);
  }
setUser(stateVar)
console.log("local var updated : ",user)
},[stateVar,typee])


  const firebaseAuth=getAuth(app);
    const provider=new GoogleAuthProvider();
    const dispatch=useDispatch();
    
  const handleLogin=async ()=>{
    if(user)
    {

     setShowMenu((prev)=>!prev); 
     toggleType("profile");
    }
    else{
    const response=await signInWithPopup(firebaseAuth,provider);
    const userr=response.user.providerData[0];
    console.log("updating state now...");
    dispatch(login(userr));
    // setUser(userr);
    localStorage.setItem('user',JSON.stringify(userr));
    }
   
  }

  const handleLogout=()=>{
    setShowMenu(false);
    dispatch(logout());
    localStorage.removeItem('user');
  }

  return (
    <div className='relative'>
        <motion.img onClick={handleLogin} whileTap={{scale:0.6}} transition={{duration:0.7}} src={user?user.photoURL:avatar} alt="Avatar" className=' rounded-full object-cover w-10 h-10 ml-11 drop-shadow-2xl'/>
        {showMenu==true && <div className='absolute top-12 -right-12   bg-slate-200 z-10 flex flex-col w-36 rounded-sm shadow-sm'>
          {user.email=="aroraaayush1111@gmail.com" && <Link to='/addnewItem' className='px-3 text-sm transition-all duration-100 ease-in-out py-3  flex items-center hover:bg-slate-300 cursor-pointer' onClick={()=>{setShowMenu((prev)=>!prev)}}>Add Item <IoMdAdd className='ml-5' /> </Link>}
          <p onClick={handleLogout} className='px-3 text-sm  transition-all duration-100 ease-in-out py-3  flex items-center hover:bg-slate-300 cursor-pointer'>Logout <CiLogout className='ml-5'/></p>
          
        </div>
}
    </div>
  )
}

export default ProfileIcon
