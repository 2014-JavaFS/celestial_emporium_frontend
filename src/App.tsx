import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Nav from './components/nav/Nav'
import Footer from './components/footer/Footer'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Checkout from './pages/checkout/Checkout'

function App() {


  return (
    <div className='App'>
      <Nav/>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>
        </Routes>
      </main>
      
      <Footer/>
    </div>
  )
}

export default App
