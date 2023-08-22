import React from 'react'
import { FormContact } from 'components';
import { css } from '@emotion/css'
import { useLayoutContext, Navigation } from 'components';

const AddContainer = () => {
  const { navigate } = useLayoutContext();

  return (
    <>
      <div className={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 10px;
      `}>
        <button type='button' className={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          span {
            margin-left: 5px;
          }
          cursor: pointer;
          outline: none;
          border: none;
          background: transparent;
          margin-bottom: 10px;
        `} onClick={() => navigate('/')}>
          <i className='icon ion-ios-arrow-back' />
          <span>Back</span>
        </button>
        <FormContact />
      </div>
      <Navigation />
    </>
  );
}

export default AddContainer
