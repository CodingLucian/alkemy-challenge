import React, { useContext } from 'react'
import styles from './Movement.module.css'
import { GlobalContext } from '../../GlobalContext/GlobalContext';

export default function Movement({id, amount, operation, details, category, date, edit}) {

  const { handleEdit, handledelete } = useContext(GlobalContext);


  return (
    <div className={styles.movementContainer}>
        {date}, {operation}, {amount}, {details}, {category} {
          edit &&
          <div>
            <button onClick={() => handleEdit(id)}>edit</button>
            <button onClick={() => handledelete(id)}>delete</button>
          </div>
          
        }
    </div>
  )
}
