import React, { useState, createContext } from 'react';
import Swal from 'sweetalert2';
// import dotenv from 'dotenv';
// dotenv.config();

const URL = process.env.REACT_APP_URL;

export const GlobalContext = createContext();

export const ContextProvider = (props) => {
  const [allMovements, setAllMovements] = useState([]);
  const [lastMov, setLastMov] = useState([]);

  // get from DB
  const getMovements = () => {
    let token = localStorage.getItem('tokenProp');
    let useremail = localStorage.getItem('userEmail');
    fetch(`${URL}/movement/`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          useremail: useremail,
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
          setAllMovements([]);
          setLastMov([]);
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
    fetch(`${URL}/movement/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    )
      .then(() => Swal.fire('Deleted!', '', 'success'))
      .then(()=> getMovements())
      .then(()=> console.log('allMovements ', allMovements))
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
    let useremail = localStorage.getItem('userEmail');
    fetch(`${URL}/movement`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        useremail: useremail,
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
    fetch(`${URL}/movement/${id}`, {
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
    console.log('user register globalcontext--> ', user)
    fetch(`${URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('register response data ', data.msg)
        data?.msg === 'user created' ? window.location.replace(data.redirect):
        (Swal.fire('An user with that Email allready Exists!', '', 'error'))
      })
      .catch((error) => console.log(error));
  };

  const login = (user) => {
    console.log('user login globalcontext--> ', user)
    fetch(`${URL}/user/login`, {
      method: 'POST',
      headers: {
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
        if(data.userEmail) window.localStorage.setItem('userEmail', data.userEmail);
        if (data.redirect) {
          window.location.replace(data.redirect);
        }else{
          console.log('no existe ese usuario')
          Swal.fire('Invalid user or password!', '', 'success');
        }
    })
      .catch((error) => console.log(error));
  };

  const logout = () => {
    window.localStorage.removeItem('userName');
    window.localStorage.removeItem('tokenProp');
    window.localStorage.removeItem('userEmail');
    window.location.replace('/');
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
