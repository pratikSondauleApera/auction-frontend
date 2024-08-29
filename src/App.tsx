import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignupUser from './pages/SignupUser'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignupUser />} />
      </Routes>
    </>
  )
}

export default App
