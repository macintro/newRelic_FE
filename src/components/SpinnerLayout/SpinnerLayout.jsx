import React from 'react';
import { Spinner } from 'react-bootstrap';

//Styles
import styles from './SpinnerLayout.module.css';

function SpinnerLayout() {
  return (
    <Spinner animation='border' role='status' className={styles.Spinner}>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  );
}

export default SpinnerLayout;
