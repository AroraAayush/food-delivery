import { Header } from "./components"
import {Route,Routes} from 'react-router-dom'
import Demo from "./components/Demo"
import Demo2 from "./components/Demo2"
import {AnimatePresence} from 'framer-motion'
import Home from "./components/Home/Home"
import CreateItem from "./components/CreateItem/CreateItem"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateItemsList } from "./store/authSlice"; 
import { fetchAllItems } from "./utils/firebaseFuncs"
function App() {

  const dispatch=useDispatch();
    const fetchData=async()=>{
        await fetchAllItems().then((data)=>{
          dispatch(updateItemsList(data));
          console.log("Date is fetched");
        })
      }

    useEffect(()=>{
      fetchData();
      
    },[])

  
  
  return (
    <AnimatePresence>
    <div className=" w-screen h-auto flex flex-col bg-primary ">
      <Header/>
      <main className="mt-24">
        
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/addnewItem" element={<CreateItem/>}></Route>
          </Routes>
        
          
     
      </main>
    </div>
    </AnimatePresence>
  )
}

export default App
