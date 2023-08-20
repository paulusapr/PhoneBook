'use client';
import React from 'react'
import { css } from '@emotion/css'
import { getContact, PersonType } from 'services/persons'
import { Navigation } from 'components';

const HomeContainer = () => {
  return (
    <div className={css`
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      overflow: auto;
      position: relative;
      &::-webkit-scrollbar {
        display: none;
      }
      @media (min-width: 768px) {
        width: 480px;
      }
    `}>
      <Navigation />
    </div>
  );
};

export default HomeContainer
