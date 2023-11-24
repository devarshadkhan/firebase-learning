
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
