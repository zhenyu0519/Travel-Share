import React, { useState, useContext } from "react";
import "./Auth.css";
import { FormInput } from "../../components/form-input/FormInput";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utils/validator";
import { useForm } from "../../components/form-hooks/FormHooks";
import { AuthContext } from "../../components/context/Context";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  const switchModelHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <div className="auth-container">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <FormInput
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={inputHandler}
          />
        )}
        <FormInput
          element="input"
          id="email"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address"
          onInput={inputHandler}
        />
        <FormInput
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password at least 5 characters"
          onInput={inputHandler}
        />
        <div className="auth-button-group">
          <button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGN UP"}
          </button>
          <button onClick={switchModelHandler}>
            SWITCH TO {isLoginMode ? "SIGN UP" : "LOGIN"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
