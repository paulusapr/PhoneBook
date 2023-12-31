import React from 'react'
import { css } from '@emotion/css'
import { Button } from './Button';
import { useLayoutContext } from 'components';

export const Navigation = () => {
  const { id, navigate } = useLayoutContext();

  return (
    <div className={css`
      display: flex;
      width: 100%;
      background: transparent;
      justify-content: center;
      position: sticky;
      top: 100%;
      left: 0;
      right: 0;
    `}>
      <div className={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border: 1px solid rgba(0, 0, 0, 0.16);
        background-color: #fff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        width: 100%;
        position: relative;
      `}>
        <Button onClick={() => navigate('/')} active={!id ? true : false} text='Contact' icon={<i className='icon ion-ios-contact' />} />
        {/* <Button text='Favourites' icon={<i className='icon ion-ios-star' />} /> */}
      </div>
    </div>
  );
}
