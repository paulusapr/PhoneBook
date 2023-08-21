'use client';
import dynamic from 'next/dynamic'
import { Layout } from 'components';

const HomeContainer = dynamic(() => import('containers'))

export default function Home() {
  return <Layout><HomeContainer /></Layout>
}
