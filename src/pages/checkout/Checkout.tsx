import CheckoutForm from '../../components/checkout-form/CheckoutForm';
import CheckoutFormCash from '../../components/checkout-form-cash/CheckoutFormCash';
import './Checkout.css'
import {useEffect, useState} from 'react'
import { useCart } from '../../context/CartContext';
import AllCartItems from '../../components/cart/Cart';
import parseJwt from '../../util/parseJwt';

function Checkout() {
    const [userId, setUserId] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if(token) {
            const decodedToken = parseJwt(token)
            if (decodedToken) {
                const decodedToken = parseJwt(token);
                if (decodedToken) {
                    decodedToken.userId;
                    setUserId(decodedToken.userId)
                    console.log(decodedToken)
                }
            }
        }
    }, [])

    const updateCartDB = async () => {
        fetch(`http://localhost:8080/cart-items/checkout/${userId}`, {
            method: "DELETE"
        })
        .then((response) => {return response.json})
        .then((data) => {
            console.log(data)
            clearCart()
        })
        .catch((error) => console.log(error))
    }

    const {clearCart, totalPrice} = useCart();

    const [payWithCard, setPayWithCard] = useState(false)
    return (
        <main>
            <h1>Checkout</h1>
            {!payWithCard && <div>
                <h5>Have our Celestial Emporium Visa Credit Card?</h5>
                <p>Click <a onClick={() => {setPayWithCard(!payWithCard)}}>here</a> to pay with it and start earning points!</p>
            </div>}
            <h3>Price: {totalPrice}</h3>
            <div style={{margin: "15px"}}> 
                <AllCartItems />
            </div>
            <div style={{margin: "25px 0px"}}>
            {!payWithCard && <CheckoutFormCash/>}
            {payWithCard && <CheckoutForm/>}
            </div>
            
            <button onClick={updateCartDB}>Checkout</button>
        </main>           

    )
}

export default Checkout;

