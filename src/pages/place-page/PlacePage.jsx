import React, { useCallback, useReducer } from "react";
import "./PlacePage.css";
import { FormInput } from "../../components/form-input/FormInput";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validator";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const PlacePage = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); //send to backend
  };
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <FormInput
        id="title"
        element="input"
        type="input"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter valid title"
        onInput={inputHandler}
        placeholder="Title"
      />
      <FormInput
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter valid description at least 5 charactors"
        onInput={inputHandler}
      />
      <FormInput
        id="address"
        element="textarea"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter valid address"
        onInput={inputHandler}
      />
      <button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </button>
    </form>
  );
};

export default PlacePage;
