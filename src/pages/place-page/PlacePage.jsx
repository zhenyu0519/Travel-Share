import React from "react";
import "./PlacePage.css";
import { FormInput } from "../../components/form-input/FormInput";
import { VALIDATOR_REQUIRE } from "../../utils/validator";

const PlacePage = () => {
  return (
    <form className="place-form">
      <FormInput
        element="input"
        type="input"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter valid title"
      />
    </form>
  );
};

export default PlacePage;
