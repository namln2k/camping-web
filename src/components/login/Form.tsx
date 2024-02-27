'use client'

import { login } from '@/actions/login'
import { LoginParams } from '@/types'
import { StyleProvider } from '@ant-design/cssinjs'
import { Form as AntDForm, Input } from 'antd'
import 'antd/dist/reset.css'
import FormItem from 'antd/es/form/FormItem'

export default function LoginForm() {
  const handleSubmit = async (values: LoginParams) => {
    const result = await login({ ...values, callbackUrl: '/' })

    // TODO: Handle result
  }

  return (
    <StyleProvider hashPriority='high'>
      <AntDForm onFinish={handleSubmit}>
        <FormItem label='Email' name='email'>
          <Input />
        </FormItem>
        <FormItem label='Password' name='password'>
          <Input.Password />
        </FormItem>
        <FormItem>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
          >
            Login
          </button>
        </FormItem>
      </AntDForm>
    </StyleProvider>
  )
}
