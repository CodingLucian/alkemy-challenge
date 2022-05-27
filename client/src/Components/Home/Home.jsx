import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import Movement from '../Movement/Movement';
import NavBar from '../NavBar/NavBar';
import styles from './Home.module.css';


export default function Home() {

  const { allMovements, lastMov, getMovements, logout } = useContext(GlobalContext);

  useEffect(()=>{
    getMovements()
  },[])
 
  return (
    <>
      <div className={styles.homeContainer}>
        <h1>Personal Finance</h1>
        <NavBar/>
        
        <div className={styles.tenOpContainer}>
          <h3>Last 10 operations:</h3>
          {lastMov?.length ? ( lastMov.map((m)=>{
            return <Movement 
              key={m.id}
              id= {m.id}
              amount= {m.amount}
              operation= {m.operation}
              details= {m.details}
              category= {m.category}
              date= {m.date}
            />
          })):(<div>No registered operations</div> )
        }</div>
        <h2 className={styles.line}>Your Balance: {
          allMovements?.balance && allMovements.balance > 0 ? <div> ${allMovements.balance}</div> : <div className={styles.red}> ${allMovements.balance}</div>
        }</h2>
        
      </div>
      <button className={styles.btnOut} onClick={logout}>
        Log Out
      </button>
    </>
  )
}
