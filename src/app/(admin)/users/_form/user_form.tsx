import { CreateUser } from "@/app/actions/form";
import { OutlinedButton, SaveButton } from "@/components/common/buttons";
import { InputPasswordX, InputX } from "@/components/common/input";
import ResDialog from "@/components/common/res_dialog";
import { UseCreateUser, UseUpdateUser } from "@/hooks/common/use_user";
import { UsersFormType } from "@/lib/zod/formvalidations";
import { useRef, useState } from "react";

interface Props {
  selectedUser: UsersFormType;
  mode: "create" | "update";
  handleCancel: (v: boolean) => void;
}

export default function UserForm({ selectedUser, mode, handleCancel }: Props) {
  const [validationStatus, setValidationStatus] = useState<string>("");
  const [openResDialog, setOpenResDialog] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const resType = useRef<"success" | "failure">("failure");

  const handleChanges = (name: string, value: string | number) => {
    selectedUser = { ...selectedUser, [name]: value };
    if (validationStatus === name) setValidationStatus("");
  };

  const handleValidation = async (user: UsersFormType) => {
    setConfirmLoading(true);
    if (user.firstName === "") {
      setValidationStatus("firstName");
      return;
    }
    if (user.lastName === "") {
      setValidationStatus("lastName");
      return;
    }
    if (user.email === "") {
      // if (!/\S+@\S+\.\S+/.test(user.email)) {
      //     setValidationStatus("email");
      //     return;
      //   }
      setValidationStatus("email");
      return;
    }
    if (user.phoneNumber === "") {
      setValidationStatus("phoneNumber");
      return;
    }
    if (user.location === "") {
      setValidationStatus("location");
      return;
    }

    if (user.password === "") {
      setValidationStatus("password");
      return;
    }

    if (mode === "create") {
      console.log("create");
      await handleCreate();
    } else {
      console.log("update");
      await handleUpdate();
    }

    setOpenResDialog(true);
    handleCancel(true);
    setConfirmLoading(false);
  };

  const handleCreate = async () => {
    const { data, success } = await UseCreateUser(selectedUser);
    console.log(success);
    if (success) {
      resType.current = "success";
    } else {
      resType.current = "failure";
    }
  };

  const handleUpdate = async () => {
    const { data, success } = await UseUpdateUser(selectedUser);
    console.log(success);
    if (success) {
      resType.current = "success";
    } else {
      resType.current = "failure";
    }
  };

  return (
    <>
      <ResDialog
        open={openResDialog}
        type={resType.current}
        onClose={() => setOpenResDialog(false)}
      />
      <form className="flex flex-col space-y-4 justify-center w-full">
        <div className="flex space-x-2">
          <InputX
            initialValue={
              selectedUser?.firstName === "" ? "" : selectedUser?.firstName
            }
            label="First Name"
            status={`${validationStatus === "firstName" ? "error" : ""}`}
            onChange={(value: any) => handleChanges("firstName", value)}
          />
          <InputX
            initialValue={selectedUser?.lastName}
            label="Last Name"
            status={`${validationStatus === "lastName" ? "error" : ""}`}
            onChange={(value: any) => handleChanges("lastName", value)}
          />
        </div>
        <InputX
          initialValue={selectedUser?.email}
          label="Email"
          status={`${validationStatus === "email" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("email", value)}
        />
        <InputX
          initialValue={selectedUser?.phoneNumber}
          label="Phone Number"
          status={`${validationStatus === "phoneNumber" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("phoneNumber", value)}
        />
        <InputX
          initialValue={selectedUser?.location}
          label="Location"
          status={`${validationStatus === "location" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("location", value)}
        />
        <InputPasswordX
          disabled={mode === "update" ? true : false}
          label="Default Password"
          status={`${validationStatus === "password" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("password", value)}
        />
        <footer className="flex justify-end">
          <OutlinedButton className="mr-3" onClick={handleCancel} />
          <SaveButton
            onClick={async () => await handleValidation(selectedUser)}
            confirmLoading={confirmLoading}
            text={mode === "create" ? "Save" : "Update"}
          />
        </footer>
      </form>
    </>
  );
}
