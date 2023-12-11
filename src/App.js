import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import MainPage from './pages/MainPage'
import './App.scss'
import LoginPage from './pages/LoginPage'

function App() {
  const [token, setToken] = useState(null)

  return (
    <div basename='/alpha-cast'>
      <AuthContext.Provider value={{ token, setToken }}>
        <BrowserRouter basename='/alpha-cast'>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/home/:id' element={<MainPage />} />
            <Route path='/' element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  )
}

export default App