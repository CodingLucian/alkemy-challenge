import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

function Modal({ children, setLocalModal }) {

  const onCancel = () => {
    setLocalModal((prev) => !prev);
  };

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div
        className={styles.modalBackground}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.cancel} onClick={onCancel}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export { Modal };
