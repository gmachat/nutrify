import React from 'react';
import { signupUser } from '../api/UserAPI';

const SignupPage = (props) => {
  const { history } = props;
  const handleSignup = async (evt) => {
    evt.preventDefault();
    let userObject = {
      'username': evt.target.username.value,
      'password': evt.target.password.value,
    }
    let response = await signupUser(userObject);
    let data = await response.json();
    if (data.error) {
      console.log('there was an error signing up');
    } else {
      history.push('/login');
    }

  }

  return (
    <div>
      Signup Page
      <form onSubmit={handleSignup}>
        <label>UserName:</label>
        <input type='text' placeholder='' name='username' />
        <label>Password:</label>
        <input type='password' name='password' />
        <button type='submit' >Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;