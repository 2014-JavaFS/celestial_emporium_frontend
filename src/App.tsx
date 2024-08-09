
import Register from './pages/register/Register'
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/home/Home";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Checkout from "./pages/checkout/Checkout";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';

const stripePromise = loadStripe('pk_test_51NlQzWG9MLiQo8RG4oST1Fywg4KXpa9ipTBWEX3FDrl2cqVvc2MBFVWaPZM9wJa9vKc5MPDBXVWLVrCeZfjjlhf400eqHsAz0x')



function App() {

  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    async function fetchClientSecret() {
        const response = await fetch("http://localhost:8080/create-payment-intent", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({amount: 1000, currency: 'usd'})
        })
  
        const data = await response.json();
        const clientSecret = data.clientSecret;
        setClientSecret(clientSecret)
        console.log(clientSecret)
    }
  
    fetchClientSecret();
  }, [])

  return (
    <CartProvider>
    <div className="App">
      <Nav />
      <Container>
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/checkout" element={
                clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <Checkout />
                  </Elements>
                ) : (
                  <p>Loading payment details...</p>
                )
              }></Route>
            <Route path="/register" element={<Register/>}></Route>
          </Routes>
        </main>
      </Container>
      <Footer />
    </div>
    </CartProvider>
  );
}

export default App;
