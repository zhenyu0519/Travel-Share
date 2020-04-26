import React, { useReducer } from "react";
import "./FormInput.css";
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: true,
      };
    default:
      return state;
  }
};
export const FormInput = ({ id, label, element, type, placeholder, rows, errorText }) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });
  const changeHandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value });
  };
  const elementContent =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && "form-control-invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {elementContent}
      {!inputState.isValid && <p>{errorText}</p>}
    </div>
  );
};
