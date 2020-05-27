import React from "react";
import { Modal } from "../modal/Modal";
import "./ErrorModal.css";

export const ErrorModal = ({ onClear, error }) => {
  return (
    <Modal
      onCancel={onClear}
      header="An Error Occurred!"
      show={!!error}
      footer={<button className="error-modal-button" onClick={onClear}>Okay</button>}
    >
      <p>{error}</p>
    </Modal>
  );
};
