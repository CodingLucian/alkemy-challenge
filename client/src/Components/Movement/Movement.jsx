import React from 'react'
import styles from './Movement.module.css'

export default function Movement({id, amount, operation, details, category, date}) {

  
  return (
    <div className={styles.movementContainer}>
        {date}, {operation}, {amount}, {details}, {category}
    </div>
  )
}
