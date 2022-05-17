import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import Movement from '../Movement/Movement';


export default function Home() {

  const { allMovements, lastMov, getMovements } = useContext(GlobalContext);

  useEffect(()=>{
    getMovements()
  },[])

  return (
    <div>
      <h3>Last 10 operations:</h3>
      <div>{
        lastMov?.length && lastMov.map((m)=>{
          return <Movement 
            key={m.id}
            id= {m.id}
            amount= {m.amount}
            operation= {m.operation}
            details= {m.details}
            category= {m.category}
            date= {m.date}
          />
        })
      }</div>
      <h1>Updated Balance:</h1>
      <div>{
        allMovements?.balance && <h1>{allMovements.balance}</h1>
      }</div>
    </div>
  )
}
