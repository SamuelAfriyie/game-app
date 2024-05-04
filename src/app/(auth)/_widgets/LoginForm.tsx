"use client";

import { LoginFormType } from "@/lib/zod/formvalidations";
import Link from "next/link";
import { useRef, useState } from "react";
import SubmitButton from "@/components/common/submit_button";
import { redirect, useRouter } from "next/navigation";
import { EmailX, InputPasswordX } from "@/components/common/input";
import { Form } from "antd";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const router = useRouter();
  const formData = useRef<LoginFormType>({
    email: "",
    password: "",
  });

  const [validationStatus, setValidationStatus] = useState<string>("");
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleChanges = (name: string, value: string | number) => {
    formData.current = { ...formData.current, [name]: value };
    if (validationStatus === name) setValidationStatus("");
  };

  const handleValidation = async (form: LoginFormType) => {
    setConfirmLoading(true);
    if (form.email === "") {
      setValidationStatus("email");
      setConfirmLoading(false);
      return;
    }
    if (form.password === "") {
      setValidationStatus("password");
      setConfirmLoading(false);
      return;
    }

    const res: any = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    console.log(res);
    if (res.error) {
      setError(true);
      setConfirmLoading(false);
      return;
    } else {
      console.log("redirecting");
      router.replace("/");
    }
  };

  return (
    <section className="flex flex-col space-y-4 justify-center w-1/2">
      {error && (
        <div className="w-full flex justify-center">
          <p className="text-red-500 text-sm">{`Username or password incorrect`}</p>
        </div>
      )}
      <Form className="space-y-4 w-full">
        <EmailX
          label="Email"
          placeholder="Email"
          status={`${validationStatus === "email" ? "error" : ""}`}
          onChange={(v: any) => handleChanges("email", v)}
        />
        <InputPasswordX
          label="Password"
          placeholder="Password"
          status={`${validationStatus === "password" ? "error" : ""}`}
          onChange={(v: any) => handleChanges("password", v)}
        />

        <SubmitButton
          innerContent={`Sign In`}
          onClick={async () => await handleValidation(formData.current)}
          loading={confirmLoading}
        />
      </Form>

      <span className="flex flex-row space-x-2.5  font-medium text-sm w-full justify-center">
        <p className="text-slate-700 ">{`Don't have an account`}</p>
        <p className="text-blue-500">
          <Link passHref href={`/register`}>{`Sign Up`}</Link>
        </p>
      </span>
    </section>
  );
};
