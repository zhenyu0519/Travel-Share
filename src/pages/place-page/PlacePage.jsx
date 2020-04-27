import React from "react";
import "./PlacePage.css";
import { FormInput } from "../../components/form-input/FormInput";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validator";
import { useForm } from "../../components/form-hooks/FormHooks";

const PlacePage = () => {
  const [formState, inputHandler] = useForm({
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
