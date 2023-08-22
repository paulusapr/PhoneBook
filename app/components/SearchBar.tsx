import React from 'react'
import { css } from '@emotion/css';
import { useLayoutContext } from 'components'

export const SearchBar = () => {
  const { search, setSearch } = useLayoutContext();

  return (
    <div className={css`
      display: flex;
      flex-direction: row;
      padding: 10px;
      justify-content: space-between;
      align-items: center;
      i {
        font-size: 2rem;
        color: #c2c2c2;
      }
      input {
        width: 100%;
        height: 100%;
        padding: 5px;
        margin-right: 5px;
        outline: none;
        border: 1px solid #c2c2c2;
        font-size: 1rem;
      }
    `}>
      <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} value={search} type='text' placeholder='search by name or phone...' name='search-input' />
      <i className='icon ion-ios-search' />
    </div>
  );
};
