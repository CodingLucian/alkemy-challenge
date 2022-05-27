import React, { useState, createContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

export const GlobalContext = createContext();

export const ContextProvider = (props) => {
  const [allMovements, setAllMovements] = useState([]);
  const [lastMov, setLastMov] = useState([]);
  const history = useHistory();

  // get from DB
  const getMovements = () => {
    let token = localStorage.getItem('tokenProp');
    let userName = localStorage.getItem('userName');
    fetch(`http://localhost:3001/movement/`,
      {
        method: 'GET',
        headers: {
          // api: `${import.meta.env.VITE_API}`,
          Authorization: 'Bearer ' + token,
          UserName: userName,
          'Content-Type': 'application/json',
        },
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
    let token = localStorage.getItem('tokenProp');
    fetch(`http://localhost:3001/movement/${id}`,
      {
        method: 'DELETE',
        headers: {
          // api: `${import.meta.env.VITE_API}`,
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
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
  const deleteOperation = (id) => {
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

  //Operation post
  const postOperation = (input) => {
    let token = localStorage.getItem('tokenProp');
    let username = localStorage.getItem('userName');
    fetch(`http://localhost:3001/movement`, {
      method: 'POST',
      headers: {
        // api: `${import.meta.env.VITE_API}`,
        Authorization: 'Bearer ' + token,
        username: username,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
      .then((response) => response.json())
      .then((data) => getMovements())
      .catch((error) => console.log(error));
  };

  const editOperation = (id, input, setLocalModal) => {
    let token = localStorage.getItem('tokenProp');
    fetch(`http://localhost:3001/movement/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        })
        .then(() => Swal.fire('Edited!', '', 'success'))
        .then((data) => getMovements())
        .then(setLocalModal((prev) => !prev))
        .catch((error) => console.log(error));
  }
  const register = (user) => {
    // let token = localStorage.getItem('tokenProp');
    console.log('user register globalcontext--> ', user)
    fetch(`http://localhost:3001/user/register`, {
      method: 'POST',
      headers: {
        // api: `${import.meta.env.VITE_API}`,
        // Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('register response data ', data)
        window.location.replace(data.redirect);
      })
      .catch((error) => console.log(error));
  };

  const login = (user) => {
    // let token = localStorage.getItem('tokenProp');
    console.log('user login globalcontext--> ', user)
    fetch(`http://localhost:3001/user/login`, {
      method: 'POST',
      headers: {
        // api: `${import.meta.env.VITE_API}`,
        // Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {  
        console.log('login response data ', data)
        if(data.accessToken) window.localStorage.setItem('tokenProp', data.accessToken);
        if(data.refreshToken) window.localStorage.setItem('refreshTokenProp', data.refreshToken);
        if(data.userName) window.localStorage.setItem('userName', data.userName);
        if (data.redirect) {
          window.location.replace(data.redirect);
        }else{
          console.log('no existe ese usuario')
          Swal.fire('Invalid user or password!', '', 'success');
        }
    })
      // .then((data)=>history.push("/"))
      // .then((data) => getMovements())
      .catch((error) => console.log(error));
  };

  const logout = () => {
    window.localStorage.removeItem('imgAvatar');
    window.localStorage.removeItem('nombrerol');
    window.localStorage.removeItem('tokenProp');
    window.localStorage.removeItem('refreshTokenProp');
    window.location.replace('/');
    // let token = localStorage.getItem('refreshTokenProp');
    // fetch(`http://localhost:3001/user/logout`, {
    //   method: 'DELETE',
    //   headers: {
    //     Authorization: 'Bearer ' + token,
    //     'Content-Type': 'application/json',
    //   },
    //   // body: JSON.stringify(user),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {  
    //     if (data.redirect) {
    //       window.location.replace(data.redirect);
    //     }else{
    //       console.log('no existe ese usuario')
    //       Swal.fire('Invalid user or password!', '', 'success');
    //     }
    // })
    //   .catch((error) => console.log(error));
  };

  return (
    <GlobalContext.Provider
      value={{
        getMovements,
        allMovements, 
        setAllMovements,
        lastMov,
        deleteOperation,
        postOperation,
        editOperation,
        register,
        login,
        logout
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
