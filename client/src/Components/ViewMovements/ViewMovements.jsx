import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import Movement from '../Movement/Movement'

export default function ViewMovements() {

  const { getMovements, allMovements } = useContext(GlobalContext);

  useEffect(()=>{
    getMovements();
  },[])

  return (
    <div>{
      allMovements?.length && allMovements.map((m)=>{
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
    }
    </div>
  )
}
