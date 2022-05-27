import React, { useState, useContext } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import styles from './Register.module.css'
import { Link } from 'react-router-dom';

const validate = (input) =>{
  let errors = {};

  if (!input.fullname) {
    errors.fullname = 'Please enter your full name';
  }

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

export default function Register() {

  const { register } = useContext(GlobalContext);
  const [input, setInput] = useState({})
  const [error, setError] = useState({})

  const handleSubmit = (e) =>{
    e.preventDefault();
    register(input);
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
        <h1>Register user</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.input}>{/* fullname */}
            <label>Full name: </label>
            <input
              type={'text'}
              name={'fullname'}
              onChange={(e) => handleChange(e)}
              placeholder="full name..."
            />
            {error.fullname && (
              <p className={styles.error}>{error.fullname}</p>
            )}
          </div>
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
          <div> {/* submit */}
            {       
            error.fullname ||
            error.email ||
            error.password 
            ? null : (
            <button className={styles.butoncito} type="submit">
              submit
            </button>
            )}
          </div>
          <Link to='/'>Log in</Link>
        </form>
      </div>
    </div>
  )
}
