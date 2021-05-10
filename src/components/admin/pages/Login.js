import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../../context/global state/GlobalState';

export const Login = () => {
  const { signIn } = useContext(GlobalContext);

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const makePasswordVisible = () => {
    const password = document.getElementById('password');
    const eyeIcon = document.querySelector('.admin-visible > i');
    if (password.type === 'password') {
      password.type = 'text';
      eyeIcon.classList.remove('fa-eye-slash');
    } else {
      password.type = 'password';
      eyeIcon.classList.add('fa-eye-slash');
    }
    eyeIcon.classList.toggle('fa-eye');
  };

  const submitForm = (e) => {
    e.preventDefault();

    signIn(usernameValue, passwordValue);
  };

  return (
    <div className='admin-login-container'>
      <div>
        <div className='admin-login-form'>
          <h3 className='page-title admin artist-title'>
            <i className='fas fa-sign-in-alt'></i> Login
          </h3>
          <form onSubmit={submitForm}>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              placeholder='Enter username'
              required
            />
            <label htmlFor='password'>Password</label>
            <div className='admin-exp'>
              <input
                type='password'
                name='password'
                value={passwordValue}
                id='password'
                onChange={(e) => setPasswordValue(e.target.value)}
                placeholder='Enter password'
                required
              />
              <div className='admin-visible'>
                <i
                  className='fas fa-eye-slash'
                  onClick={makePasswordVisible}
                ></i>
              </div>
            </div>
            <input type='submit' name='submit' className='admin-prim-btn' />
          </form>
          <p>
            Want to become an admin? <a href='/add'>Join Us</a>
          </p>
        </div>
      </div>
    </div>
  );
};
