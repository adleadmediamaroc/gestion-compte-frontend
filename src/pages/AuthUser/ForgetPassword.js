import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import classNames from "classnames";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
//import { AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";
//import './Style.css';
// { API_BASE_URL } from "constants/constants";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
 //const navigate = useNavigate();
 const history = useHistory();

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  );
  //const buttonContainerClassName = classNames( "w-full flex justify-center items-center " );

  function handleBackToLogin() {
   // navigate("/login");
 history.push('/login');
  }

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

  function handleForgotPassword() {
    if (validateForm()) {
      axios
        .get("http://localhost:8080/api/auth/forgot-password", {
          params: {
            email: email,
          },
        })
        .then((response) => {
          setMessage(response.data.message);
          setError("");
        })
        .catch((error) => {
          setError(error.response.data);
        });
    }
  }

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            borderRadius: "56px",
            width: "720px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg,  #0092ca 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8"
            style={{ borderRadius: "53px" }}
          >
            {/* <Button
              icon={
                <AiOutlineArrowRight
                  style={{ fontSize: "40px", backgroundColor: "orange" }}
                />
              }
              className="p-button-text p-button-sm p-button-secondary"
              onClick={handleGoBack}
              iconPos="right"
            /> */}

            <div className="text-center mb-5">
              {/*<img
                src={`assets/demo/images/avatar/logo.png`}
                alt="Image"
                height="50"
                className="mb-3"
              />*/}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-900 text-2xl font-medium mb-2"
              >
              <p className="my-message"> Entrez votre adresse email associée à votre compte et nous vous
                enverrons un email avec un lien pour réinitialiser votre mot de
                passe. </p>
              </label>
              <InputText
                id="email"
                type="email"
                placeholder="email adresse"
                className="w-full md:w-40rem h-50 mb-5"
                style={{
                  padding: "1.3rem",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                  setError("");
                }}
              />
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

              <div className="">
          
              <center><Button label="Réinitialise le mot de passe" className="w-auto p-3 text-lg" onClick={handleForgotPassword} ></Button><span> </span>
                <em></em><Button label="Retour à la page de connexion" className="w-auto p-3 text-lg" onClick={handleBackToLogin} ></Button>
                </center>
              
              </div>
            

              {error && (
                <div className="flex align-items-center justify-content-center mb-5 gap-5">
                  <div
                    className="flex align-items-center"
                    style={{
                      color: "black",
                      textAlign: "center",
                      padding: "10px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      backgroundColor: "red",
                      borderRadius: "5px",
                      marginTop: "15px",
                    }}
                  >
                    {error}
                  </div>
                </div>
              )}

              {message && (
                <div className="flex align-items-center justify-content-center mb-5 gap-5">
                  <div
                    className="flex align-items-center"
                    style={{
                      color: "white",
                      textAlign: "center",
                      padding: "10px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      backgroundColor: "green",
                      borderRadius: "5px",
                      marginTop: "15px",
                    }}
                  >
                    {message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
