
import React, { useState, useEffect, useContext } from 'react';
import styles from './EditOperation.module.css';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import Swal from 'sweetalert2';


export function validate(input) {
  let errores = {};

  if (!input.amount) {
    errores.amount = 'Please enter the operation amount';
  } else if (!/^(\d+(\.\d+)?)$/.test(input.amount)) {
    errores.amount = 'The amount can only contain numbers and , . ';
  }

  if (!input.category || input.category === 'null') {
    errores.category = 'Please select a category';
  }

  return errores;
}

export default function EditOperation({id, amount, operation, details, category, date, setLocalModal}) {
  let [error, setError] = useState({});
  const initialState = {
    id: id,
    operation: operation,
    amount: amount,
    details: details,
    date: date,
    category: category
  };
  let [input, setInput] = useState(initialState);

  const { editOperation } = useContext(GlobalContext);

      
  useEffect(() => {
    setInput(initialState);
  }, []);

  let handleSubmit = (e) => {
        e.preventDefault();
        editOperation(id, input, setLocalModal);
        setInput(initialState);
        e.target.reset();
      };
    
      let handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        let objError = validate({ ...input, [e.target.name]: e.target.value });
        setError(objError);
      };
    
      const confirmSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
          title: 'Are you sure you want to commit the changes to this operation?',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
          customClass: {
            actions: 'my-actions',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          }
        }).then((result) => {
          if (result.isConfirmed) {
            handleSubmit(e)
          }
        })
      }

  return (
    <div className={styles.allcss}>
      <div className={styles.formulario}>
        <h1>New Transaction:</h1>
        <form onSubmit={(e) => confirmSubmit(e)}>
          <div>{/* operation type */}
            <label>operation type: </label>
            <div>{operation}</div>
          </div>
          <div>{/* category */}
            <label>category: </label>
            <select name="category" defaultValue={category || ''} onChange={(e) => handleChange(e)}>
              <option value="null">Select...</option>
              <option value="food">food</option>
              <option value="taxes">taxes</option>
              <option value="extras">extras</option>
              <option value="work">work</option>
              <option value="rent">rent</option>
              <option value="other">other</option>
            </select>
            {error.category && <p className={styles.error}>{error.category}</p>}
          </div>
          <div>{/* details */}
              <label>Op. Details: </label>
              <input
                type={'text'}
                name={'details'}
                onChange={(e) => handleChange(e)}
                defaultValue={details || ''}
                placeholder="details..."
              />
              {error.details && (
                <p className={styles.error}>{error.details}</p>
              )}
          </div>
          <div>{/* amount */}
              <label>amount: </label>
              <input
                type="number"
                name="amount"
                onChange={(e) => handleChange(e)}
                defaultValue={amount<0? -amount : amount}
                placeholder="amount..."
              />
              {error.amount && (
                <p className={styles.error}>{error.amount}</p>
              )}
          </div>
          <div>{/* date */}
            <label>date: </label>
            <input
              type="date"
              name="date"
              onChange={(e) => handleChange(e)}
              defaultValue={date || ''}
            />
            {error.date && (
              <p className={styles.error}>{error.date}</p>
            )}
          </div>
          <div>{/* submit */}
            {       
            error.category ||
            error.details ||
            error.amount
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
