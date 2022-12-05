import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import '../Login/Login.css'
import './Signup.css'
const Signup = () => {
    const { createUser } = useContext(AuthContext)

    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = (event) => {


        event.preventDefault()

        const form = event.target;
        const email = form.email.value
        const password = form.password.value
        const confirm = form.confirm.value
        console.log(email, password, confirm)


        if (password !== confirm) {
            setError('Your password did not match')
            return
        }
        if (password.length > 6) {
            setError('password should be 6 characters or more')
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset()
                navigate('/')
            })
            .catch(error => console.error(error))
    }
    return (
        <div className='form-container '>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='Email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Password' required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name='confirm' placeholder='Confirm_Password' required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p>Already have an account <Link to='/login'>Login</Link></p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default Signup;