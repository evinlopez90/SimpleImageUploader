
import './App.css'
import NavBar from './components/NavBar'
import Uploader from './components/Uploader'

function App() {
 

  return (
    <div className=' bg-primaryLight dark:bg-primaryDark w-full h-screen transition-colors '>
      <NavBar/>
      <Uploader/>
    </div>
  )
}

export default App
