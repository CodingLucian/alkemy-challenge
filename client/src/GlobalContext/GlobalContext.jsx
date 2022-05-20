import React, { useState, createContext, useEffect } from 'react';
import Swal from 'sweetalert2';

export const GlobalContext = createContext();

export const ContextProvider = (props) => {
  const [allMovements, setAllMovements] = useState([]);
  const [lastMov, setLastMov] = useState([]);


  // get from DB
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

  // DB deletion
  const deleteMovements = (id) => {
    fetch(`http://localhost:3001/movement/${id}`,
      {
        method: 'DELETE',
      }
    )
      .then(() => Swal.fire('Deleted!', '', 'success'))
      .then(()=> getMovements())
      .catch((err) => {
        if (err.response) {
          const { response } = err;
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        }
      });
  };
  
  // Operation Deletion Confirmation alert
  const handledelete = (id) => {
    Swal.fire({
      title: 'Are you sure you want to delete this operation?',
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
        deleteMovements(id)
      }
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        getMovements,
        allMovements, 
        setAllMovements,
        lastMov,
        handledelete
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
