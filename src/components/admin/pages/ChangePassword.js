import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../context/global state/GlobalState';

export const ChangePassword = () => {
  const { changePassword } = useContext(GlobalContext);

  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const makePasswordVisible = (e) => {
    const password = e.target.parentElement.previousElementSibling;
    const eyeIcon = e.target;
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

    if (passwordValue !== confirmPasswordValue) {
      setErrorMsg('Password does not match');
    } else {
      changePassword(passwordValue);
      setErrorMsg('');
      setSuccessMsg('Password succesfully changed');
    }
  };

  return (
    <div className='admin-login-container'>
      <div>
        <div className='admin-login-form'>
          <h3 className='page-title admin artist-title'>
            <i className='fas fa-lock'></i> Change Password
          </h3>
          <form onSubmit={submitForm}>
            <label htmlFor='password'>New Password</label>
            <div className='admin-exp'>
              <input
                type='password'
                name='password'
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                placeholder='Enter password'
              />
              <div className='admin-visible'>
                <i
                  className='fas fa-eye-slash'
                  onClick={makePasswordVisible}
                ></i>
              </div>
            </div>
            <label htmlFor='password'>Confirm Password</label>
            <div className='admin-exp'>
              <input
                type='password'
                name='con-password'
                value={confirmPasswordValue}
                id='password'
                onChange={(e) => setConfirmPasswordValue(e.target.value)}
                placeholder='Enter password'
              />
              <div className='admin-visible'>
                <i
                  className='fas fa-eye-slash'
                  onClick={makePasswordVisible}
                ></i>
              </div>
            </div>
            <input type='submit' name='submit' className='admin-prim-btn' />
            <p
              style={{
                color: `${errorMsg ? 'red' : 'green'}`,
                textAlign: 'center',
              }}
            >
              {errorMsg ? errorMsg : successMsg}
            </p>
            {successMsg && (
              <>
                <br />
                <a
                  href='login'
                  style={{ display: 'block', textAlign: 'center' }}
                >
                  Login with New Password
                </a>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
