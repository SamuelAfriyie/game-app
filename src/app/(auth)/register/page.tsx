import { RegisterForm } from "@/app/(auth)/_widgets/RegisterForm";
import React from "react";
import { Image } from "antd";

const Register = () => {
  return (
    <main className="w-full h-full justify-center items-center flex flex-col space-y-12">
      <header className="flex flex-col space-y-3 items-center">
        <Image
          src="./static/photos/seedstars.png"
          width={150}
          preview={false}
          alt="login-img"
        />
        <p className="text-4xl font-bold text-slate-800">{`Create an account`}</p>
      </header>

      <RegisterForm />
    </main>
  );
};

export default Register;
