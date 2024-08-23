import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignupUser from './pages/SignupUser'

function App() {

  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignupUser />} />
      </Routes>
    </>
  )
}

export default App
