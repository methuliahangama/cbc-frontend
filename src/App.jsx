import { useState } from 'react'
import './App.css'
import ProductCard from './components/productCard.jsx'
import UserData from './components/userData.jsx'
import Testing from './components/testing.jsx'
import LoginPage from './pages/loginPage.jsx'
import HomePage from './pages/homePage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes path="/=">
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
