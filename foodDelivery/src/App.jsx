import { Header } from "./components"
import {Route,Routes} from 'react-router-dom'
import Demo from "./components/Demo"
import Demo2 from "./components/Demo2"
import {AnimatePresence} from 'framer-motion'
import Home from "./components/Home/Home"
import CreateItem from "./components/CreateItem/CreateItem"
function App() {
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
