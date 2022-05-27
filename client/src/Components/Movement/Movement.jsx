import React, { useContext, useState } from 'react'
import styles from './Movement.module.css'
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { Modal } from '../ModalEdit/ModalEdit';
import EditOperation from '../EditOperation/EditOperation';

export default function Movement({id, amount, operation, details, category, date, edit}) {

  const { deleteOperation } = useContext(GlobalContext);
 
  // Operation Edition 
  const [editMovementModal, setEditMovementModal] = useState(false);

  const onClickEdit = function () {
    setEditMovementModal((prevState) => !prevState);
  };

  return (
    <div className={styles.movementContainer}>
      <div className={styles.line}>
        <div className={styles.movSmallContainer}>
          <div>
            {date}
          </div>
          <div className={(operation === 'out' ? styles.out : styles.in )}>
            {amount}
          </div>
          <div>
            {details}
          </div>
          <div>
            {category}
          </div>
        </div>
        {
          edit &&
          <div className={styles.btns}>
            <button className={styles.btn} onClick={onClickEdit}>edit</button>
            <button className={styles.btn} onClick={() => deleteOperation(id)}>delete</button>
          </div>
      }</div>
      {!!editMovementModal && (
        <Modal setLocalModal={setEditMovementModal}>
          <EditOperation 
            setLocalModal={setEditMovementModal}
            id= {id}
            amount= {amount}
            operation= {operation}
            details= {details}
            category= {category}
            date= {date}
          />
        </Modal>
      )}
    </div>
  )
}
