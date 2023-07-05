import React, { useState } from "react";
import {  Form} from "react-bootstrap";
import { Checkbox } from 'primereact/checkbox';

import { Password } from 'primereact/password';




function App() {
  const [checkboxValue, setCheckboxValue] = useState([]);

  const onCheckboxChange = (event) => {
    const selectedValue = event.target.value;
    let updatedValues = [];
    if (event.target.checked) {
      updatedValues = [...checkboxValue, selectedValue];
    } else {
      updatedValues = checkboxValue.filter((value) => value !== selectedValue);
    }
    setCheckboxValue(updatedValues);
  };

  const inputError = "";

  return (
    <div>
      <div className="field-radiobutton">
        <Checkbox
          inputId="checkOption1"
          name="option"
          value="per"
          checked={checkboxValue.indexOf("per") !== -1}
          onChange={onCheckboxChange}
        />
        <label htmlFor="checkOption1">Autoriser l'authentification en deux étapes</label>
      </div>

      {checkboxValue.includes("per") ?  (
        <Form.Group controlId="formBasicName">
          <label>Password</label>
          <div className="p-inputgroup">
            <Password id="password" required toggleMask disabled/>
            {inputError && <span style={{ color: "red" }}>{inputError}</span>}
          </div>
        </Form.Group>
      ) :  (
        <Form.Group controlId="formBasicName">
          <label>Password</label>
          <div className="p-inputgroup">
            <Password id="password" required  toggleMask/>
            {inputError && <span style={{ color: "red" }}>{inputError}</span>}
          </div>
        </Form.Group>
      )}
    </div>
  );
}

export default App;