'use client';
import React, { createContext, useContext, useState, Suspense } from 'react'
import { css } from '@emotion/css'
import { Navigation, SearchBar, ContactList } from 'components';

interface HomeType {
  search: string;
  setSearch: (search: string) => void;
}

export const HomeContext = createContext<HomeType>({} as HomeType);

const HomeContainer = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <HomeContext.Provider value={{ search, setSearch }}>
      <SearchBar />
      <Suspense fallback={`Loading...`}><ContactList /></Suspense>
      <button type='button' className={css`
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1d66dd;
        border: none;
        position: absolute;
        z-index: 3;
        top: 80%;
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
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);

export default HomeContainer
