import './CheckoutFormCash.css'
import { useState } from 'react';
const CheckoutFormCash = () => {
    const [address, setAddress] = useState('');

    const handleSubmit = () => {

        console.log("Call backend endpoint here")
    }

    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <div className="form-group">
                    <label htmlFor="checkout_address">Delivery Address</label>
                    <input type="address" id="checkoutAddress" placeholder="Delivery Address" required value={address} 
                    onChange={(e) => setAddress(e.target.value)}></input>
                </div>
                <div className='form-group'>
                    <button type="submit">Checkout</button>
                </div>
            </form>

        </>
    )
}

export default CheckoutFormCash