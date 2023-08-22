import React, { Suspense } from 'react'
import { css } from '@emotion/css'
import { Navigation, SearchBar, ContactList } from 'components'
import { useLayoutContext } from 'components';

const HomeContainer = () => {
  const { navigate } = useLayoutContext();

  return (
    <>
      <SearchBar />
      <Suspense fallback={`Loading...`}><ContactList /></Suspense>
      <button type='button' onClick={() => navigate('/add')} className={css`
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1d66dd;
        border: none;
        position: absolute;
        z-index: 3;
        top: 75%;
        right: 0;
        border-radius: 100px;
        height: 50px;
        width: 50px;
        color: #c2c2c2;
        cursor: pointer;
        i {
          font-size: 2rem;
        }
      `}>
        <i className='icon ion-ios-add' />
      </button>
      <Navigation />
    </>
  );
};

export default HomeContainer
