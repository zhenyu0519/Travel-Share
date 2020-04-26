import React from "react";
import "./FormInput.css";

export const FormInput = ({ id, label, element, type, placeholder, rows }) => {
  console.log(label)
    const elementContent =
    element === "input" ? (
      <input id={id} type={type} placeholder={placeholder} />
    ) : (
      <textarea id={id} rows={rows || 3} />
    );

  return (
    <div className="form-control">
      <label htmlFor={id}>{label}</label>
      {elementContent}
    </div>
  );
};
