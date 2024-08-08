import './Register.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = {email, password, firstName, lastName, address}
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {

                console.log(response)
                navigate('/login')
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed. Please try again')
            }
            
        } catch (error) {
            console.log(error)
        }

    }



    return (
        <div className="login-container">
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Register</h2>
                {error && <div className='error-message'>{error}</div>}
                <div className="form-group">
                    <label htmlFor="register-email">Email</label>
                    <input type="email" id="register-email" placeholder="email" required value={email} 
                    onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="register-password">Password</label>
                    <input type="password" id="register-password" placeholder="password" required value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="register-firstName">First Name</label>
                    <input type="text" id="register-firstName" placeholder="First Name" required value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="register-lastName">Last Name</label>
                    <input type="text" id="register-lastName" placeholder="Last Name" required value={lastName}
                    onChange={(e) => setLastName(e.target.value)}></input>
                </div>
                <div className="form-group center">
                    <label htmlFor="register-address">Address</label>
                    <input type="text" id="register-address" placeholder="Address" required value={address}
                    onChange={(e) => setAddress(e.target.value)}></input>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )

}

export default Register;