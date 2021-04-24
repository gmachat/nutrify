import React from 'react';
import {Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Login = ({isLoggedIn, handleLogin}) => {

  if (isLoggedIn) {
    return <Redirect to={`/`} />
  }

  return (
    <div className="main-grid">
      <div className="interface-container">
        <div className="interface-box">
          <h1 className="interface-box-title">Login</h1>
          <form className="interface-form" onSubmit={handleLogin}>
            <input type='text' placeholder='Username' name='username' />
            <input type='password' placeholder='Password' name='password' />
            <button type='submit' >Login</button>
          </form>
          <div>
          New Here? <Link to='/signup' className="mid-sentence-link">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;