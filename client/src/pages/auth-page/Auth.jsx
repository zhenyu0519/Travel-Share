import React, { useState, useContext } from "react";
import "./Auth.css";
// import components
import { FormInput } from "../../components/form-input/FormInput";
import { ErrorModal } from "../../components/error-modal/ErrorModal";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { useHttpClient } from "../../components/http-hooks/HttpHooks";
import { ImageUpload } from "../../components/image-upload/ImageUpload";
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
  //
  const {
    isLoading,
    error,
    sendRequest,
    clearErrorModalHandler,
  } = useHttpClient();

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (error) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
          "POST",
          formData
        );
        auth.login(responseData.userId, responseData.token);
      } catch (error) {}
    }
  };

  const switchModelHandler = () => {
    // sign up
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {// login
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
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
    <React.Fragment>
      <ErrorModal error={error} onClear={clearErrorModalHandler} />
      <div className="auth-container">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <ImageUpload
              id="image"
              onInput={inputHandler}
              errorText="Please choose an image!"
            />
          )}
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
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password at least 6 characters"
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
    </React.Fragment>
  );
};

export default Auth;
