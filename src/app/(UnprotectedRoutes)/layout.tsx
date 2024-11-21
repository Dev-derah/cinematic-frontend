import { Navbar } from '@/components/Navbar'
import React from 'react'

type LayoutProps = {
    children: React.ReactNode
}

export default function layout({
    children
}:LayoutProps) {
  return (
    <div>
        <Navbar/>
        {children}

    </div>
  )
}