import CheckoutForm from '../../components/checkout-form/CheckoutForm';
import CheckoutFormCash from '../../components/checkout-form-cash/CheckoutFormCash';
import './Checkout.css'
import {useState} from 'react'

function Checkout() {

    const [payWithCard, setPayWithCard] = useState(false)
    return (
        <main>
            <div>
                <h5>Want to start earning points and chances to win extra gear?</h5>
                <p>Join our exclusive Celestial Emporium Credit Card</p>
                <p>Click <a onClick={() => {setPayWithCard(!payWithCard)}}>here</a> to be automatically enrolled, no questions asked!</p>
            </div>
            {!payWithCard && <CheckoutFormCash/>}
            {payWithCard && <CheckoutForm/>}
        </main>           

    )
}

export default Checkout;

