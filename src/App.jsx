
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import UserDashboard from './pages/Dashboard/userDashboard/UserDashboard'
import VenderDashboard from './pages/Dashboard/venderDashboard/VenderDashboard'
import Crud from './pages/Crud/Crud'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<UserDashboard />}/>
        <Route path="/vender-dashboard" element={<VenderDashboard />}/>
        <Route path="/crud" element={<Crud />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
