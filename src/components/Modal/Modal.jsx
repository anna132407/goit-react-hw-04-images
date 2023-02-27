import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export function Modal({ largeImageURL, handleModal }) {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        handleModal();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleModal]);

  const handleBackDrop = e => {
    if (e.target === e.currentTarget) {
      handleModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleBackDrop}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="Large" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  handleModal: PropTypes.func.isRequired,
};
