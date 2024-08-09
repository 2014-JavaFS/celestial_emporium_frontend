
import { PaymentElement } from '@stripe/react-stripe-js'
import './CheckoutForm.css'

const CheckoutForm = () => {

    const handleSubmit = () => {
        return;
    }


    return (
        <form className="form-container" onSubmit={handleSubmit}>
                <PaymentElement/>
            </form>
    )
}

export default CheckoutForm;