import React, { useState, useEffect, useContext } from 'react';
import styles from './NewOperation.module.css';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { format } from 'date-fns';


export function validate(input) {
  let errores = {};


  if (!input.amount) {
    errores.amount = 'Please enter the operation amount';
  } else if (!/^(\d+(\.\d+)?)$/.test(input.amount)) {
    errores.amount = 'The amount can only contain numbers and , . ';
  }

  if (!input.operation || input.operation === 'null') {
    errores.operation = 'Please select operation type';
  }

  if (!input.category || input.category === 'null') {
    errores.category = 'Please select a category';
  }

  return errores;
}

export default function NewOperation() {

  let [error, setError] = useState({});
  const actualDate = new Date(); 
  const today = actualDate.toLocaleDateString('en-CA')
  // console.log('today', today)
  const initialState = {
    operation: '',
    amount: '',
    details: '',
    date: today,
    category: ''
  };
  let [input, setInput] = useState(initialState);

  const { getMovements } = useContext(GlobalContext);

      
  useEffect(() => {
    setInput(initialState);
  }, []);

  // useEffect(()=>{
  //   console.log('input', input)
  // },[input])

  let handleSubmit = (e) => {
        e.preventDefault();
        // let token = localStorage.getItem('tokenProp');
        fetch(`http://localhost:3001/movement`, {
          method: 'POST',
          headers: {
            // api: `${import.meta.env.VITE_API}`,
            // Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        })
          .then((response) => response.json())
          .then((data) => getMovements())
          .catch((error) => console.log(error));
        setInput(initialState);
        e.target.reset();
      };
    
  let handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
    // console.log(input);
  };
    

  return (
    <div className={styles.allcss}>
      <div className={styles.formulario}>
        <h1>New Transaction:</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.selects2}>
            <div className={styles.col}>
              <div className={styles.selects}>{/* operation type */}
                <label className={styles.selTxt}>operation type: </label>
                <select name="operation" onChange={(e) => handleChange(e)}>
                  <option value="null">Select...</option>
                  <option value="in">Income</option>
                  <option value="out">Expense</option>
                </select>
              </div>
              {error.operation && <p className={styles.error}>{error.operation}</p>}
            </div> 
            <div className={styles.col}>
              <div className={styles.selects}>{/* category */}
                <label className={styles.selTxt}>category: </label>
                <select name="category" onChange={(e) => handleChange(e)}>
                  <option value="null">Select...</option>
                  <option value="food">food</option>
                  <option value="taxes">taxes</option>
                  <option value="extras">extras</option>
                  <option value="work">work</option>
                  <option value="rent">rent</option>
                  <option value="other">other</option>
                </select>
              </div>
              {error.category && <p className={styles.error}>{error.category}</p>}
            </div>  
          </div> 
          <div className={styles.input}>{/* details */}
            <label>Op. Details: </label>
            <input
              type={'text'}
              name={'details'}
              onChange={(e) => handleChange(e)}
              placeholder="details..."
            />
            {error.details && (
              <p className={styles.error}>{error.details}</p>
            )}
          </div>
          <div className={styles.input}>{/* amount */}
             <label>amount: </label>
             <input
               type="number"
               name="amount"
               onChange={(e) => handleChange(e)}
               placeholder="amount..."
             />
             {error.amount && (
               <p className={styles.error}>{error.amount}</p>
             )}
          </div>
          <div className={styles.input}>{/* date */}
            <label>date: </label>
            <input
              type="date"
              name="date"
              onChange={(e) => handleChange(e)}
              defaultValue={today}
            />
            {error.date && (
              <p className={styles.error}>{error.date}</p>
            )}
          </div>
          <div> {       
            error.operation ||
            error.category ||
            error.details ||
            error.amount ||
            input.amount === ''
            ? null : (
            <button className={styles.butoncito} type="submit">
              submit
            </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}