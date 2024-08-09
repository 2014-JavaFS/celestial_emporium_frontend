import CheckoutForm from '../../components/checkout-form/CheckoutForm';
import CheckoutFormCash from '../../components/checkout-form-cash/CheckoutFormCash';
import './Checkout.css'
import {useState} from 'react'

function Checkout() {

    const [payWithCard, setPayWithCard] = useState(false)
    return (
        <main>
            <div>
                <h5>Have our Celestial Emporium Visa Credit Card?</h5>
                <p>Click <a onClick={() => {setPayWithCard(!payWithCard)}}>here</a> to pay with it and start earning points!</p>
            </div>
            {!payWithCard && <CheckoutFormCash/>}
            {payWithCard && <CheckoutForm/>}
        </main>           

    )
}

export default Checkout;

