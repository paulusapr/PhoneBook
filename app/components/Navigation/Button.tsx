import React, { ReactNode, ReactElement } from 'react';
import { css } from '@emotion/css';

type ButtonProps = {
  onClick?: () => void;
  text: string;
  icon?: ReactNode | ReactElement;
}

export const Button = ({ text, onClick, icon }: ButtonProps) => (
  <button className={css`
    box-shadow: none;
    outline: none;
    border: none;
    border-radius: unset;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    padding: 10px 0px 0px 0px;
    background: transparent;
    color: #c2c2c2;
    width: 100%;
    height: 100%;
    cursor: pointer;
    align-items: center;
    position: relative;
    span {
      text-align: center;
    }
    div {
      box-shadow: none;
      border: none;
      border-radius: unset;
      padding: unset;
      height: 4px;
      width: 100%;
    }
    i {
      font-size: 2rem;
    }
    &:hover {
      color: #1d66dd;
      font-weight: 500;
      i {
        &::before {
          color: #1d66dd;
        }
      }
      div {
        height: 4px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: #1d66dd;
      }
    }
  `} type='button' onClick={onClick}>
    {icon}
    <span>{text}</span>
    <div />
  </button>
)
