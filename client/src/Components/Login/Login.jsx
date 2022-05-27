import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';


const validate = (input) =>{
  let errors = {};

  // password
  if (!input.password) {
    errors.password = 'Please enter a password';
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(input.password)) {
    errors.password ='should have 8+ characters, at least one letter and one number:';
  }

  // email
  if (!input.email) {
    errors.email = 'Please enter an email';
  } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.email)) {
    errors.email ='The entered value must be in the format name@example.com';
  }

  return errors
}

export default function Login() {

  const { login } = useContext(GlobalContext);
  const [input, setInput] = useState({})
  const [error, setError] = useState({})

  const handleSubmit = (e) =>{
    e.preventDefault();
    login(input);
    setInput({})
    e.target.reset();
  }

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
  };

  return (
    <div className={styles.allcss}>
      <div className={styles.formulario}>
        <h1>Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.input}>{/* email */}
            <label>E-mail: </label>
            <input
              type={'text'}
              name={'email'}
              onChange={(e) => handleChange(e)}
              placeholder="name@example.com..."
            />
            {error.email && (
              <p className={styles.error}>{error.email}</p>
            )}
          </div>
          <div className={styles.input}>{/* password */}
            <label>Password: </label>
            <input
              type={'text'}
              name={'password'}
              onChange={(e) => handleChange(e)}
              placeholder="password..."
            />
            {error.password && (
              <p className={styles.error}>{error.password}</p>
            )}
          </div>
          <div> {       
            error.email ||
            error.password 
            ? null : (
            <button className={styles.butoncito} type="submit">
              login
            </button>
            )}
          </div>
          <Link to='/register'>Sign Up</Link>
        </form>
      </div>
    </div>
  )
}
