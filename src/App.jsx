import { useState } from 'react'
import LoginPage from './pages/loginPage.jsx'
import HomePage from './pages/homePage.jsx'
import RegisterPage from './pages/registerPage.jsx'
import AdminHomePage from './pages/adminHomePage.jsx'
import ResponseTest from './pages/admin/responseTest.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-primary'>
      <BrowserRouter>
      <Toaster position='top-right'/>
      <GoogleOAuthProvider clientId='750530440578-fq8dhnhscsqaamcm5i5555bf9u03si5p.apps.googleusercontent.com'>
        <Routes path="/*">
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminHomePage />} />
          <Route path="/response" element={<ResponseTest />} />
          <Route path="/*" element={<HomePage/>} />
        </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>

    </div>
  )
}

export default App
