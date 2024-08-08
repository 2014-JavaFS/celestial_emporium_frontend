
import { PaymentElement } from '@stripe/react-stripe-js'
import './CheckoutForm.css'

const CheckoutForm = () => {

    const handleSubmit = () => {
        return;
    }


    return (
        <form className="form-container" onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <PaymentElement/>
                
                <button type="submit">checkout</button>
            </form>
    )
}

export default CheckoutForm;