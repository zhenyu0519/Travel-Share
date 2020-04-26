import React, { useReducer } from "react";
import "./FormInput.css";
import { validate } from "../../utils/validator";
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};
export const FormInput = ({
  id,
  label,
  element,
  type,
  placeholder,
  rows,
  errorText,
  validators,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const elementContent =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control-invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {elementContent}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};
