'use client';
import { css } from '@emotion/css'
import { getContact, PersonType } from 'services/persons'
import { Navigation } from 'components';

export default function Home() {
  const { data } = getContact();
  console.log(data.contact);

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
    </main>
  )
}
