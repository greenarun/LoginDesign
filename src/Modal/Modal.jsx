import React, { useState } from 'react';
import styles from './Modal.module.css'

const Modal = ({ isOpen, onClose }) => {
  const [level, setLevel] = useState('easy');

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Select Difficulty Level</h2>

        <form>
          <label className={styles.label}>
            <input
              type="radio"
              name="level"
              value="easy"
              checked={level === 'easy'}
              onChange={(e) => setLevel(e.target.value)}
            />
            Easy
          </label> 
          <label className={styles.label}>
            <input
              type="radio"
              name="level"
              value="medium"
              checked={level === 'medium'}
              onChange={(e) => setLevel(e.target.value)}
            />
            Medium
          </label> 
          <label className={styles.label}>
            <input
              type="radio"
              name="level"
              value="hard"
              checked={level === 'hard'}
              onChange={(e) => setLevel(e.target.value)}
            />
            Hard
          </label>
        </form>

        <p className={styles.selected}>Selected Level: <strong>{level}</strong></p>
      </div>
    </div>
  );
};

export default Modal