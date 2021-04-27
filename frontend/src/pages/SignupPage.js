import React, {useState} from 'react';
import {Link} from 'react-router-dom'

import { signupUser } from '../api/UserAPI';

const SignupPage = (props) => {
  const { history } = props;
  const [error, setError] = useState(null)

  const handleSignup = async (evt) => {
    evt.preventDefault();

    if(evt.target.password.value !== evt.target.password2.value){
      setError("Passwords must match!")
      return
    }

    let userObject = {
      'username': evt.target.username.value,
      'password': evt.target.password.value,
      'email': evt.target.email.value
    }
    let response = await signupUser(userObject);
    let data = await response.json();
    if (data.error) {
      setError('there was an error signing up');
    } else {
      history.push('/login');
    }

  }

  return (

    <div className="main-grid">
      <div className="interface-container">
        <div className="interface-box">
          <h1 className="interface-box-title secondary-backdrop text-section secondary-on-primary">Signup</h1>
          {error && <div className="login-signup-error">{error}</div>}
          <form className="interface-form secondary-backdrop text-section secondary-on-primary" onSubmit={handleSignup}>
            <input type='email' placeholder='Email' name='email' />
            <input type='text' placeholder='Username' name='username' />
            <input type='password' placeholder="Password" name='password' />
            <input type='password' placeholder="Confirm Password" name='password2' />
            <button type='submit' >Sign Up</button>
          </form>
          <div className="secondary-backdrop text-section secondary-on-primary">
          Have an account? <Link to='/login' className="mid-sentence-link-secondary">Login</Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SignupPage;