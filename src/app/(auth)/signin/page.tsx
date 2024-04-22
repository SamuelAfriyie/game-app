import { LoginForm } from '@/app/(auth)/_widgets/LoginForm';
import React from 'react'
import { Image } from 'antd';

const Login = () => {

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };


  return (
    <main className='w-full h-full justify-center items-center flex flex-col space-y-12'>

      <header className="flex flex-col space-y-3 items-center">
        <Image src='./static/photos/seedstars.png' width={150} preview={false} />
        <p className="text-4xl font-bold text-slate-800 text-center">{`Welcome Back`}</p>
        <p className="text-xl font-medium text-slate-700">
          {`Sign in to your account to continue`}
        </p>
      </header>

      <LoginForm/>


    </main>
  )
}



export default Login