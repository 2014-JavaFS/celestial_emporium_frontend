import './Login.css'
import { useState } from 'react';

function Login() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword]  = useState<string>("")


    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = {email, password}

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                console.log('success')
                console.log(response.json())
            } else {
                console.log('error')
            }
        } catch (error) {
                console.log(error)
            }
    }

    return (
        <div className="login-container">
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="login-email">Email</label>
                    <input type="email" id="login-email" placeholder="email" required value={email} 
                    onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input type="password" id="login-password" placeholder="password" required value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;