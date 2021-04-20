import React from 'react';
import {Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Login = ({isLoggedIn, handleLogin}) => {

  if (isLoggedIn) {
    return <Redirect to={`/`} />
  }

  return (
    <div>
    <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>UserName:</label>
        <input type='text' placeholder='' name='username' />
        <label>Password:</label>
        <input type='password' name='password' />
        <button type='submit' >Submit</button>
      </form>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
};

export default Login;