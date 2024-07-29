import { Header } from "./components"
import {Route,Routes} from 'react-router-dom'
import Demo from "./components/Demo"
import Demo2 from "./components/Demo2"
import {AnimatePresence} from 'framer-motion'
function App() {
  return (
    <AnimatePresence>
    <div className=" w-screen h-auto flex flex-col bg-primary ">
      <Header/>
      <main className="mt-24">
        
          <Routes>
            <Route path="/" element={<Demo/>}></Route>
            <Route path="/addnewItem" element={<Demo2/>}></Route>
          </Routes>
        
          
     
      </main>
    </div>
    </AnimatePresence>
  )
}

export default App
