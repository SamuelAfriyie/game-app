import { CreateUser } from "@/app/actions/form";
import { OutlinedButton, SaveButton } from "@/components/common/buttons";
import { InputX } from "@/components/common/input";
import { UsersFormType } from "@/lib/zod/formvalidations";
import { useRef, useState } from "react";

interface Props {
  handleCancel: (v: boolean) => void;
}

export default function UserForm({ handleCancel }: Props) {
  const formData = useRef<UsersFormType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
  });

  const [validationStatus, setValidationStatus] = useState<string>("");

  const handleChanges = (name: string, value: string | number) => {
    formData.current = { ...formData.current, [name]: value };
    if (validationStatus === name) setValidationStatus("");
  };

  const handleValidation = (data: UsersFormType) => {
    if (data.firstName === "") {
      setValidationStatus("firstName");
      return;
    }
    if (data.lastName === "") {
      setValidationStatus("lastName");
      return;
    }
    if (data.email === "") {
        // if (!/\S+@\S+\.\S+/.test(data.email)) {
        //     setValidationStatus("email");
        //     return;
        //   }
      setValidationStatus("email");
      return;
    }
    if (data.phone === "") {
      setValidationStatus("phone");
      return;
    }
    if (data.location === "") {
      setValidationStatus("location");
      return;
    }

    CreateUser(formData.current);
  };

  return (
    <form className="flex flex-col space-y-4 justify-center w-full">
      <div className="flex space-x-2">
        <InputX
          label="First Name"
          status={`${validationStatus === "firstName" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("firstName", value)}
        />
        <InputX
          label="Last Name"
          status={`${validationStatus === "lastName" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("lastName", value)}
        />
      </div>
        <InputX
          label="Email" 
          status={`${validationStatus === "email" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("email", value)}
        />
      <InputX
        label="Phone Number"
        status={`${validationStatus === "phone" ? "error" : ""}`}
        onChange={(value: any) => handleChanges("phone", value)}
      />
      <InputX
        label="Location"
        status={`${validationStatus === "location" ? "error" : ""}`}
        onChange={(value: any) => handleChanges("location", value)}
      />
      <footer className="flex justify-end">
        <OutlinedButton className="mr-3" onClick={handleCancel} />
        <SaveButton onClick={() => handleValidation(formData.current)} />
      </footer>
    </form>
  );
}
