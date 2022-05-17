import React, { useState, createContext, useEffect } from 'react';

export const GlobalContext = createContext();

export const ContextProvider = (props) => {
  const [allMovements, setAllMovements] = useState([]);
  const [lastMov, setLastMov] = useState([]);

  const getMovements = () => {
    fetch(`http://localhost:3001/movement/`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.movements.length) {
          let aux = data.movements
          setAllMovements(data)
          if(aux.length<11) { 
            setLastMov(aux)
          }else {
            setLastMov(aux.slice((aux.length - 10), aux.length))
          }
        } else {
          console.log("No Movements Found");
        }
      })
      .catch((err) => {
        if (err.response) {
          const { response } = err;
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        }
      });
  };

  // useEffect(()=>{
  //   console.log('lastMov', lastMov)
  // }, [lastMov]);  
  useEffect(()=>{
    console.log('allMovements', allMovements);
    console.log('lastMov', lastMov);
  }, [allMovements])

  return (
    <GlobalContext.Provider
      value={{
        getMovements,
        allMovements, 
        setAllMovements,
        lastMov
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
