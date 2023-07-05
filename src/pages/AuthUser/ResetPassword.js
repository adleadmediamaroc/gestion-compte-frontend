import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';


function Reset() {
  const history = useHistory();
  const { token } = useParams();

  const containerClassName = classNames(
    'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden'
  );

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError('');
  };

  const handleResetPassword = async () => {
    try {
      if (password === confirmPassword) {
        const response = await axios.get(`http://localhost:8080/api/auth/reset-password`, {
          params: { token, password },
        });
        console.log(response.data);
        history.push('/login');
      } else {
        setError('Passwords do not match');
      }
    } catch (error) {
      console.log(error);
      setError('Failed to reset password');
    }
  };

  return (
    <div
      className={containerClassName}
      style={{ backgroundImage: `url("assets/demo/images/avatar/background.png")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
    >
      <div className="flex flex-column align-items-center justify-content-center">
        <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg,  #0092ca 10%, rgba(33, 150, 243, 0) 30%)' }}>
          <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
            <div>
              <label htmlFor="password" className="block text-900 text-xl font-medium mb-2">
                New Password
              </label>
              <Password
                id="password"
                value={password}
                placeholder="New Password"
                className="w-full mb-5"
                inputClassName="w-full p-3 md:w-30rem"
                onChange={handlePasswordChange}
              ></Password>

              <label htmlFor="confirmPassword" className="block text-900 font-medium text-xl mb-2">
                Confirm New Password
              </label>
              <Password
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                className="w-full mb-5"
                inputClassName="w-full p-3 md:w-30rem"
                onChange={handleConfirmPasswordChange}
              ></Password>

              <Button label="Reset Password" onClick={handleResetPassword} className="w-full mb-2" />

              {error && <div className="text-red-600 mt-2">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
