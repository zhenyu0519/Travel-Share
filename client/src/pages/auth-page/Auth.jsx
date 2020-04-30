import React, { useState, useContext } from "react";
import "./Auth.css";
// import components
import { FormInput } from "../../components/form-input/FormInput";
// import validators
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utils/validator";
// import useForm state manager
import { useForm } from "../../components/form-hooks/FormHooks";
// useContext Hook to share the authorized state
import { AuthContext } from "../../components/context/Context";

const Auth = () => {
  // useContext Hook to share the authorized state
  const auth = useContext(AuthContext);
  // react useState hook to manage the isLoginMode state
  const [isLoginMode, setIsLoginMode] = useState(true);
  // init the useForm state manager
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

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          // to let backend server know the data type send to it
          headers: {
            "Content-Type": "application/json",
          },
          // convert all requset data to json
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    }

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
    setIsLoginMode((prevMode) => {
      return !prevMode;
    });
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
          <button type="button" onClick={switchModelHandler}>
            SWITCH TO {isLoginMode ? "SIGN UP" : "LOGIN"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
