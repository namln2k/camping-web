'use client'

import { login } from '@/actions/auth/login'
import { add } from '@/lib/redux/features/messages/messagesSlice'
import { useAppDispatch } from '@/lib/redux/hooks'
import { LoginParams } from '@/types'
import { Form as AntDForm, Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'

interface Props {
  callbackUrl?: string | null
}

export default function LoginForm({ callbackUrl = '/' }: Props) {
  const dispatch = useAppDispatch()

  const handleSubmit = async (values: LoginParams) => {
    const result = await login({ ...values, callbackUrl })

    if (result?.error) {
      dispatch(
        add({
          type: 'error',
          title: result?.error,
          content: result?.detail,
        })
      )
    }
  }

  return (
    <AntDForm onFinish={handleSubmit}>
      <FormItem
        label='Email'
        name='email'
        required
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please enter a valid email!',
          },
        ]}
      >
        <Input />
      </FormItem>
      <FormItem
        label='Password'
        name='password'
        required
        rules={[
          {
            required: true,
            message: 'Please enter your password!',
          },
        ]}
      >
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
  )
}
