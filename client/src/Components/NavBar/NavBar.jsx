import React, { useState } from 'react';
import { Modal } from '../Modal/Modal'
import NewOperation from '../NewOperation/NewOperation';
import AllOperations from '../AllOperations/AllOperations';
import styles from './NavBar.module.css';

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
          <div className={styles.menuContainer}>
            <div><button className={styles.navBtn} onClick={onClickAll}>All Operations</button></div>
            <div><button className={styles.navBtn} onClick={onClickNew}>New Operation</button></div>
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