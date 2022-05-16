import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const ContextProvider = (props) => {
  const [allMovements, setAllMovements] = useState([]);
  const [balance, setBalance] =useState(0);

  const getMovements = () => {
    fetch(`http://localhost:3001/movement/`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length) {
          setAllMovements(data)
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

  return (
    <GlobalContext.Provider
      value={{
        getMovements,
        allMovements, 
        setAllMovements
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
