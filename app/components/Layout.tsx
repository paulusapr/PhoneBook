import React, { ReactElement, ReactNode } from 'react'
import { css } from '@emotion/css';

type LayoutProps = {
  children: ReactNode | ReactElement;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className={css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}>
      <div className={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        position: relative;
        @media (min-width: 768px) {
          width: 480px;
        }
      `}>{children}</div>
    </main>
  );
}
