import { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, title, onModalClose }) => {



  useEffect(() => {  
    const handleCloseModal = (e) => {
        if (e.key === "Escape") {
            onModalClose();
        }
    };
    // Устанавливаем слушатель события при монтировании
    document.addEventListener("keydown", handleCloseModal);

    // Сбрасываем слушатель события при удалении компонента из DOM
    return () => {
      document.removeEventListener("keydown", handleCloseModal);
    };
  }, [onModalClose]);

  return ReactDOM.createPortal(
    <div className={styles.modal}>
    <div className={styles.window}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className="text text_type_main-large">{title}</p>
          <div style={{ cursor: "pointer" }}>
            <CloseIcon type="primary" onClick={onModalClose} />
          </div>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
      <ModalOverlay onModalClose={onModalClose} />
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onModalClose: PropTypes.func.isRequired,
};

export default Modal;