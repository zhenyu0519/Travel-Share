import React from "react";
import "./PlacePage.css";
import { FormInput } from "../../components/form-input/FormInput";

const PlacePage = () => {
  return (
    <form className="place-form">
      <FormInput
        element="input"
        type="input"
        label="title"
        validators={[]}
        errorText="Please enter valid title"
      />
    </form>
  );
};

export default PlacePage;
