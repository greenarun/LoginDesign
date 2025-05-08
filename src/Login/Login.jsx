import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../Modal/Modal'
import styles from './Login.module.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID);
      onLogin();
      navigate('/play');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('User not found. Please register first.');
      } else {
        setError(error.response?.data.message || 'Error logging in');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && 
      <div><p className={styles.error}>
        <span> <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4h2v4h-2zm0-8V7h2v2h-2z"/>
          </svg></span>
          <span className={styles.errorText}>{error}</span>
          </p>
      </div>
      }
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={styles.input}
        />
        <div className={styles.buttonContainer}>
          <button type="submit" className={`${styles.button} ${styles.loginButton}`}>
            Login
          </button>
          
        </div>
        <div className={styles.buttonContainer}>
           
          <button type="button" onClick={handleRegisterRedirect} className={`${styles.button} ${styles.registerButton}`}>
            Don't have account ? Register now !
          </button>
        </div>

    
       
      </form>
      <button onClick={() => setModalOpen(true)} className={styles.modalbtn}>Level Section</button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

    </div>
  );
};

export default Login;