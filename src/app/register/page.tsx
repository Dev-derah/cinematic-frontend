import React from 'react'
import AuthForm from '@/components/Forms/AuthForm'

type Props = {}

export default function page({}: Props) {
  return (
    <div>
        <AuthForm formType='Registration'/>
    </div>
  )
}