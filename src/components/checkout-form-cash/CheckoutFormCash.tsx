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
                <div className="form-group">
                    <label htmlFor="checkout_address">Delivery Address</label>
                    <input type="address" id="checkoutAddress" placeholder="Delivery Address" required value={address} 
                    onChange={(e) => setAddress(e.target.value)}></input>
                </div>
            </form>

        </>
    )
}

export default CheckoutFormCash