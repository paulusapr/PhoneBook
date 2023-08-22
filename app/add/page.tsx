'use client';
import React from 'react'
import { Layout } from 'components';
import dynamic from 'next/dynamic'

const AddContainer = dynamic(() => import('containers/AddContainer'))

export default function FormContact() {
  return <Layout><AddContainer /></Layout>
}
