import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal'
import NewOperation from '../NewOperation/NewOperation';
import AllOperations from '../AllOperations/AllOperations';


export default function NavBar() {

  const [allMovementsModal, setAllMovementsModal] = useState(false);
  const [newMovementModal, setNewMovementsModal] = useState(false);

  const onClickAll = function () {
    setAllMovementsModal((prevState) => !prevState);
  };

  const onClickNew = function () {
    setNewMovementsModal((prevState) => !prevState);
  };
    
    return ( 
        <div>
          <div>
            <div><button onClick={onClickAll}>All Operations</button></div>
            <div><button onClick={onClickNew}>New Operation</button></div>
          </div>
          {!!allMovementsModal && (
            <Modal setLocalModal={setAllMovementsModal}>
              <AllOperations />
            </Modal>
          )}
          {!!newMovementModal && (
            <Modal setLocalModal={setNewMovementsModal}>
              <NewOperation />
            </Modal>
          )}
        </div>
    );
};