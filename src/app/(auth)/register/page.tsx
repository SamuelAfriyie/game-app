import { RegisterForm } from '@/app/(auth)/_widgets/RegisterForm';
import React from 'react'

const Register = () => {




  return (
    <main className='w-full h-full justify-center items-center flex flex-col space-y-12'>

      <header className="flex flex-col space-y-3">
        <p className="text-4xl font-bold text-slate-800">{`Create an account`}</p>
        <p className="text-xl font-medium text-slate-700">
          {``}
        </p>
      </header>

      <RegisterForm/>


    </main>
  )
}



export default Register