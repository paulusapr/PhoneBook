'use client';
import React from 'react'
import { Layout } from 'components';
import dynamic from 'next/dynamic'

const DetailContainer = dynamic(() => import('containers/DetailContainer'))

export default function ContactDetail() {
  return <Layout><DetailContainer /></Layout>
}
