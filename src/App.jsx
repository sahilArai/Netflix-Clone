import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Navbar from './Components/Navbar'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>    
    </AuthContextProvider>
    </>
  )
}

export default App
