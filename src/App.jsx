import { useState } from 'react'
import './App.css'
import ProductCard from './components/productCard.jsx'
import UserData from './components/userData.jsx'
import Testing from './components/testing.jsx'
import LoginPage from './pages/loginPage.jsx'
import HomePage from './pages/homePage.jsx'
import RegisterPage from './pages/signinPage.jsx'
import AdminHomePage from './pages/adminHomePage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
      <Toaster position='top-right'/>
        <Routes path="/*">
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<UserData />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminHomePage />} />
          <Route path="/*" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
