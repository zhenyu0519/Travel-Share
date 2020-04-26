import React from "react";
import ReactDom from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";
import { Backdrop } from "../backdrop/Backdrop";

const ModalOverlay = ({ header, onSubmit, children, footer }) => {
  const content = (
    <div className="modal">
      <header className="modal-header">
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className="modal-content">{children}</div>
        <footer className="modal-footer">{footer}</footer>
      </form>
    </div>
  );
  return ReactDom.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={0}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
