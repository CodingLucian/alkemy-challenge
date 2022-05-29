import React, { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import Movement from '../Movement/Movement';
import styles from './AllOperations.module.css';

export default function AllOperations() {

  const { allMovements } = useContext(GlobalContext);
  const [ filteredMovements, setFilteredMovements ] = useState([])

  useEffect(()=>{
    allMovements?.movements?.length ? setFilteredMovements([...allMovements?.movements]):
    setFilteredMovements([]);
  },[allMovements])

  const handlefilter = (e) => {
    if(e === 'all'){
      setFilteredMovements([...allMovements?.movements]);
    }else if(e === 'moneyIn'){
      let aux = allMovements?.movements.filter((m) => m.operation === 'in');
      setFilteredMovements([...aux]);
    }else if(e === 'moneyOut'){
      let aux = allMovements?.movements.filter((m) => m.operation === 'out');
      setFilteredMovements([...aux]);
    }
  }

  return (
    <div className={styles.allOpContainer}>
      <h1>All Operations</h1>
      <div className={styles.select}>
        <select name="opType" placeholder='select operation type' onChange={(e) => handlefilter(e.target.value)}>
          <option value="all">all operations</option>
          <option value="moneyIn">money In</option>
          <option value="moneyOut">money Out</option>
        </select>
      </div>
      <div>{
        filteredMovements?.length ? ( filteredMovements.map((m)=>{
          return <Movement 
            key={m.id}
            id= {m.id}
            amount= {m.amount}
            operation= {m.operation}
            details= {m.details}
            category= {m.category}
            date= {m.date}
            edit= 'true'
          />
        })):(<div>No registered operations</div> )
      }
      </div>
    </div>
  )
}
