import React, { useEffect, useState } from 'react'
import { MdSubtitles } from "react-icons/md";
import { categories } from './items';
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoCloudUploadOutline } from 'react-icons/io5';
import { MdDelete } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase.config';
import { saveItem } from '../../utils/firebaseFuncs';
import { useDispatch } from 'react-redux';
import { updateItemsList } from '../../store/authSlice';
import { fetchAllItems } from '../../utils/firebaseFuncs';
function CreateItem() {
    const dispatch=useDispatch();
    const [title,setTitle]=useState("");
    const [category,setCategory]=useState(null);
    const [price,setPrice]=useState("");
    const [calories,setCalories]=useState("");
    const [fields,setFields]=useState(false);
    const [loading,setLoading]=useState(false);
    const [alertType,setAlertType]=useState("");
    const [msg,setMsg]=useState("");
    const [imageAsset,setImageAsset]=useState(null);
  const uploadImage=(e)=>{
    setLoading(true);
    const imgFile=e.target.files[0];
    const storageRef=ref(storage,`images/${Date.now()}-${imgFile.name}`)
    const uploadTask=uploadBytesResumable(storageRef,imgFile);

    uploadTask.on('state_changed',
        (snapshot) => {
          
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
            setFields(true);
                    setAlertType("danger")
                    setLoading(false);
                    setMsg("Error while uploading.. Try again!")
                    setTimeout(()=>{
                        setFields(false);
                    },4000)
        }, 
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setImageAsset(downloadURL)
            setLoading(false);
            setFields(true)
            setAlertType("success");
            setMsg("Image Uploaded succesfully!")
            setTimeout(()=>{
                setFields(false);
            },4000)
          });
        }
      );

  }
  const deleteImage=()=>{
    const deleteRef=ref(storage,imageAsset)
    deleteObject(deleteRef).then(()=>{
        setImageAsset(null)
        setFields(true);
            setLoading(false);
            setAlertType("success");
            setMsg("Image Deleted succesfully!")
            setTimeout(()=>{
                setFields(false);
            },4000)
    })
  }  
  const saveDetails=()=>{ 
    try{ 
    if(!title || !category || !price || !calories || !imageAsset)
    {
        setFields(true);
        setAlertType("danger")
        setMsg("Required fields cannot be empty..")
        setTimeout(()=>{
            setFields(false);
        },4000)
    }
    else
    {
const data={
    id:`${Date.now()}`,
    title:title,
    category:category,
    price:price,
    calories:calories,
    image:imageAsset
}
console.log(data);
saveItem(data)
fetchData();

setFields(true);
        setAlertType("success")
        setMsg("Item added Successfully")
        clearData();
        setTimeout(()=>{
            setFields(false);
        },4000)

  }
}
catch(e)
{
    setFields(true);
    setAlertType("danger")
    setLoading(false);
    setMsg("Error while uploading.. Try again!")
    setTimeout(()=>{
        setFields(false);
    },4000)
}

}

const clearData=()=>{
    setTitle("");
    // setCategory(null);
    setPrice("");
    setCalories("");
setImageAsset(null);
}

const fetchData=async()=>{
    await fetchAllItems().then((data)=>{
        dispatch(updateItemsList(data));
      
    })
  }
 useEffect(()=>{ console.log(" value of select catwory : ",category)},[category])
    return (
    
    <div className='lg:w-3/4 min-h-screen w-[90%] m-auto flex flex-col items-center justify-center overflow-y-hidden'>
    <div className='h-auto  w-full flex flex-col justify-center items-center p-4 border-2 border-neutral-300 shadow-xl gap-3'>

{fields && (
    <p className={`w-full p-2 rounded-lg text-center ${alertType=="danger"?'text-red-600':'text-green-500'}`} > {msg}</p>
)}

<div className='w-full p-2 flex flex-row items-center justify-center  gap-2 border-2 border-gray-200'>
<MdSubtitles className='w-16 h-8'/>
<input type="text" className='text-textColor font-semibold w-full p-3 bg-neutral-100 outline-slate-400 ' placeholder='Enter your title..' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
</div>


<div className='w-full bg-neutral-200 border-2 border-gray-200' >
    <select defaultValue={"other"} className='w-full bg-neutral-100 p-3 text-headingColor capitalize text-base font-medium' 
    onChange={(e)=>{
        console.log(e.target.value)
        setCategory(e.target.value)}}
    name="" id="">
        <option value="other" className=''>Select any Category</option>
        {categories && categories.map((item)=>(
            <option id={item.id} value={item.urlParamName} className='p-3 text-headingColor bg-neutral-100 outline-none capitalize font-medium text-base'>{item.name}</option>
        ))}
    </select>
    
</div>
<div className='w-full h-225 border-2 border-gray-200 md:h-300 cursor-pointer flex flex-col justify-center items-center'>
    {
    loading?
    <>
     <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    </>
    :<>
    
    {!imageAsset?
    <label htmlFor='uploadimage'  className=' flex flex-col justify-center items-center gap-2 cursor-pointer'>
    <div className=' flex flex-col justify-center items-center gap-2 cursor-pointer'>
    <FaCloudUploadAlt className='w-10 h-6'/>
    <span>
        Click here to upload..
    </span>
    </div>
    <input type="file" accept='images/*' id='uploadimage'  onChange={uploadImage} className='w-0 h-0 cursor-pointer' />
    
    </label>
    :
    <div className='relative h-full'>
        <img src={imageAsset} alt="uploaded image" className='object-cover w-full h-full' />
        <button className='absolute bottom-3 right-3 p-3 rounded-full cursor-pointer hover:shadow-lg outline-none bg-red-500' onClick={deleteImage}><MdDelete/></button>
    </div>}
    </>
}
</div>

        </div>
        <div className='h-auto  w-full flex flex-col justify-center items-center p-4 border-2 border-neutral-300 shadow-xl gap-3'>
        <div className='w-full p-2 flex flex-row items-center justify-center  gap-2 border-2 border-gray-200'>
<MdSubtitles className='w-16 h-8'/>
<input type="number" className='text-textColor font-semibold w-full p-3 bg-neutral-100 outline-slate-400 ' placeholder='Enter calories' value={calories} onChange={(e)=>{setCalories(e.target.value)}} />
</div>
<div className='w-full p-2 flex flex-row items-center justify-center  gap-2 border-2 border-gray-200'>
<FaDollarSign className='w-16 h-8'/>
<input type="number" className='text-textColor font-semibold w-full p-3 bg-neutral-100 outline-slate-400 ' placeholder='Enter price..' value={price} onChange={(e)=>{setPrice(e.target.value)}} />
</div>
<button className='bg-green-500 text-white lg:ml-auto lg:w-28 w-full font-bold px-4 py-3 rounded-lg' onClick={saveDetails}>Save</button>
        </div>
        
        </div>
    
  )
}

export default CreateItem
