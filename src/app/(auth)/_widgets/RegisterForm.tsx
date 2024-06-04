"use client";
import { useRef, useState } from "react";
import { RegisterFormType } from "@/lib/zod/formvalidations";
import Link from "next/link";
import SubmitButton from "@/components/common/submit_button";
import { EmailX, InputPasswordX, InputX } from "@/components/common/input";
import { Form } from "antd";
import { UseRegister } from "@/hooks/common/use_register";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const formData = useRef<RegisterFormType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    educationalLevel: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [validationStatus, setValidationStatus] = useState<string>("");
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const handleChanges = (name: string, value: string | number) => {
    formData.current = { ...formData.current, [name]: value };
    if (validationStatus === name) setValidationStatus("");
  };

  const handleValidation = async (form: RegisterFormType) => {
    setConfirmLoading(true);
    if (form.firstName === "") {
      setValidationStatus("firstName");
      setConfirmLoading(false);
      return;
    }
    if (form.lastName === "") {
      setValidationStatus("lastName");
      setConfirmLoading(false);
      return;
    }
    if (form.email === "") {
      setValidationStatus("email");
      setConfirmLoading(false);
      return;
    }
    if (form.phoneNumber === "") {
      setValidationStatus("phoneNumber");
      setConfirmLoading(false);
      return;
    }
    if (form.educationalLevel === "") {
      setValidationStatus("educationalLevel");
      setConfirmLoading(false);
      return;
    }
    if (form.location === "") {
      setValidationStatus("location");
      setConfirmLoading(false);
      return;
    }

    if (form.password === "") {
      setValidationStatus("password");
      setConfirmLoading(false);
      return;
    }

    if (form.confirmPassword === "") {
      setValidationStatus("confirmPassword");
      setConfirmLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setValidationStatus("confirmPassword");
      setConfirmLoading(false);
      return;
    }

    const { data, success } = await UseRegister(formData.current); 
    if (success) {
      router.replace("/signin");
    }
    setConfirmLoading(false);
  };

  return (
    <section className="flex flex-col space-y-4 justify-center w-full md:w-1/2 px-5 xl:p-0">
      <Form className="space-y-3 w-full">
        <section className="flex flex-row space-x-5 w-full">
          <InputX
            placeholder="First Name"
            label={""}
            status={`${validationStatus === "firstName" ? "error" : ""}`}
            onChange={(v: any) => handleChanges("firstName", v)}
          />
          <InputX
            placeholder="Last Name"
            label={""}
            status={`${validationStatus === "lastName" ? "error" : ""}`}
            onChange={(v: any) => handleChanges("lastName", v)}
          />
        </section>
        <EmailX
          placeholder="Email"
          label={""}
          status={`${validationStatus === "email" ? "error" : ""}`}
          onChange={(v: any) => handleChanges("email", v)}
        />
        <InputX
          placeholder="Phone Number"
          label={""}
          status={`${validationStatus === "phoneNumber" ? "error" : ""}`}
          onChange={(v: any) => handleChanges("phoneNumber", v)}
        />
        <InputX
          placeholder="Educational Level"
          label={""}
          status={`${validationStatus === "educationalLevel" ? "error" : ""}`}
          onChange={(v: any) => handleChanges("educationalLevel", v)}
        />
        <InputX
          placeholder="Location"
          label={""}
          status={`${validationStatus === "location" ? "error" : ""}`}
          onChange={(v: any) => handleChanges("location", v)}
        />
        <InputPasswordX
          placeholder="Password"
          label={""}
          status={`${validationStatus === "password" ? "error" : ""}`}
          onChange={(v: any) => handleChanges("password", v)}
        />
        <InputPasswordX
          placeholder="Confirm Password"
          label={""}
          status={`${validationStatus === "confirmPassword" ? "error" : ""}`}
          onChange={(v: any) => handleChanges("confirmPassword", v)}
        />
        <SubmitButton
          innerContent={`Register`}
          onClick={async () => await handleValidation(formData.current)}
          loading={confirmLoading}
        />
      </Form>

      <span className="flex flex-row space-x-2.5  font-medium text-sm w-full justify-center">
        <p className="text-slate-700 ">{`Already have an account ?`}</p>
        <p className="text-blue-500">
          <Link passHref href={`/signin`}>{`Log In`}</Link>
        </p>
      </span>
    </section>
  );
};
