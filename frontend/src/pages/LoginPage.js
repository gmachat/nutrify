import React, {useEffect, useState} from 'react';
import {Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Login = ({isLoggedIn, handleLogin}) => {
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (e) => {
    const res = await handleLogin(e)
    if(!res.ok) setErrorMessage("Invalid username or password")
    
  }

  if (isLoggedIn) {
    return <Redirect to={`/`} />
  }



  return (
    <div className="main-grid">
      <div className="interface-container">
        <div className="interface-box">
          <h1 className="interface-box-title secondary-backdrop text-section secondary-on-primary">Login</h1>
          <form className="interface-form secondary-backdrop text-section secondary-on-primary" onSubmit={e => handleSubmit(e)}>
            {errorMessage && (
            <div className='form-error danger'>
              <div className="close-box" onClick={() => setErrorMessage(null)}>X</div>
              <div>{errorMessage}</div>
              </div>
            )}
            <input type='text' placeholder='Username' name='username' />
            <input type='password' placeholder='Password' name='password' />
            <button type='submit' >Login</button>
          </form>
          <div className="secondary-backdrop text-section secondary-on-primary" style={{textAlign: 'center'}}>
          New Here? <Link to='/signup' className="mid-sentence-link-secondary">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;