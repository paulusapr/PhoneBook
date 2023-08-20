'use client';
import dynamic from 'next/dynamic'
import { css } from '@emotion/css'

const HomeContainer = dynamic(() => import('containers'))

export default function Home() {
  return (
    <main className={css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}>
      <HomeContainer />
    </main>
  )
}
