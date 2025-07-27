import React from 'react'
import { Route,  Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ButtonDemo from './components/ButtonDemo'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/demo' element={<ButtonDemo />} />
    </Routes>
    </>
  )
}

export default App