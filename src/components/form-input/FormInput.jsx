import React, { useReducer, useEffect } from "react";
import "./FormInput.css";
// import validtor
import { validate } from "../../utils/validator";

// input reducer to manage input state
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
  onInput,
  initialValue,
  initialValid,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || "",
    isValid: initialValid || false,
    isTouched: false,
  });
  // receive a function with side effect as first parameter, the second parameter is dependence of triger
  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid, onInput]);

  // can be think as an action of input change
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  };

  // an action of input focus, when you toched the input and input is invalid then error occur
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
