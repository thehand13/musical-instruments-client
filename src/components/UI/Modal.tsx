import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop: React.FC<{ closeModalFunc: () => void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.closeModalFunc} />;
};

const ModalOverlay: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const modalRoot = document.getElementById('modal-root')!;

const Modal: React.FC<{
  children: React.ReactNode;
  closeModalFunc: () => void;
}> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModalFunc={props.closeModalFunc} />,
        modalRoot
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        modalRoot
      )}
    </>
  );
};

export default Modal;
