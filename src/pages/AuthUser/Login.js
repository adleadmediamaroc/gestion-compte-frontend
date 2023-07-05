import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import axios from 'axios';

//import { FaBeer } from 'react-icons/fa';
import {  BsTruckFront,BsTrainFreightFront,BsAirplaneEngines } from "react-icons/bs";

//import { BiTrainFreightFront } from 'react-icons/bootstrap';

import { Alert } from 'react-bootstrap';
//import image from '../assets/p201702171529112130252.png';

//import { useNavigate } from "react-router-dom";

function Login() {
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const history = useHistory();
  const [showError, setShowError] = useState(false);
  // const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden');

  function validateForm() {
    let valid = true;

    if (!email.trim()) {
      setEmailError("Veuillez entrer votre email");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Entrer un email valide");
      valid = false;
    } else {
      setEmailError("");
    }

    return valid;
  }

  
const handleLogin = async (event) => {
  if (validateForm()){
    axios.post('http://localhost:8080/api/auth/login', {
      email : email,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 200) {
          window.location.href = '/'
        } else {
          // show error message
           setShowError(true);
        }
      })
      .catch(error => {
        setShowError(true);  
        console.error('Error:', error);
      });
  } 
}

  return (
    <div className={containerClassName} style={{ backgroundImage: `url("assets/demo/images/avatar/background.png")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', }}>
      <div className="flex flex-column align-items-center justify-content-center">
        <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg,  #0092ca 10%, rgba(33, 150, 243, 0) 30%)' }}>
          <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
            <div className="text-center mb-5">
              {/*<img src={{image}} alt="Image" height="50" className="mb-3" /> */}
              <BsAirplaneEngines size="2em"/><BsTruckFront  size="2em"/><BsTrainFreightFront size="2em"/>
            </div>

            <div>
              <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                Email
              </label>
              <InputText inputid="username" type="text" placeholder="Email Address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} onChange={(event) =>{ setEmail(event.target.value) ; setEmailError("")}} />
              {emailError && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "13px",
                    marginTop: "-15px",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                  className="danger"
                >
                  {emailError}
                </p>
              )}

              <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                Password
              </label>
              <Password inputid="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password"  className="w-full mb-5" inputClassName='w-full p-3 md:w-30rem' ></Password>

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox inputid="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked)} className="mr-2"></Checkbox>
                  <label htmlFor="rememberme1">
                    Remember me
                  </label>
                </div>
                <Link to="/forgetPassword" className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: '#5585b5' }}>
                  Forgot password?
                </Link>
              </div>
            
              <Button label="Se connecter" className="w-full p-3 text-xl" onClick={handleLogin} ></Button>
              {showError &&
                <Alert variant="danger">
                 Email  ou mot de passe incorrect .
                </Alert>
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;