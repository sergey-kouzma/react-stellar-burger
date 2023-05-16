import styles from './ModalOverlay.module.css'
import PropTypes from "prop-types";

export default function ModalOverlay({onModalClose}) {
  const handleClick = (e) => {
    e.stopPropagation();
    onModalClose();
  }
  return(
    <div 
      className={styles.overlay}
      onClick={handleClick}
    />
  )
}

ModalOverlay.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  };
  
