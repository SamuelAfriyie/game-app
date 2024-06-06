import { OutlinedButton, SaveButton } from "@/components/common/buttons";
import { EmailX, InputPasswordX, InputX } from "@/components/common/input";
import ResDialog from "@/components/common/res_dialog";
import { UseCreateUser, UseUpdateUser } from "@/hooks/common/use_user";
import { UsersFormType } from "@/lib/zod/formvalidations";
import { useEffect, useRef, useState } from "react";

interface Props {
  selectedUser: any;
  mode: "create" | "update";
  handleCancel: (v: boolean) => void;
  resetForm: () => void;
}

export default function UserForm({
  selectedUser,
  mode,
  handleCancel,
  resetForm,
}: Props) {
  const init = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
  };

  const [formData, setFormData] = useState<any>(init);
  const [validationStatus, setValidationStatus] = useState<string>("");
  const [openResDialog, setOpenResDialog] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const resType = useRef<"success" | "failure">("failure");
  const cusomMsg = useRef<string | undefined>(undefined);

  const handleChanges = (name: string, value: string | number) => {
    setFormData({ ...formData, [name]: value });
    if (validationStatus === name) setValidationStatus("");
  };

  const handleValidation = async (user: UsersFormType) => {
    setConfirmLoading(true);
    if (user.firstName === "") {
      setValidationStatus("firstName");
      setConfirmLoading(false);
      return;
    }
    if (user.lastName === "") {
      setValidationStatus("lastName");
      setConfirmLoading(false);
      return;
    }
    if (user.email === "") {
      // if (!/\S+@\S+\.\S+/.test(user.email)) {
      //     setValidationStatus("email");
      //     return;
      //   }
      setValidationStatus("email");
      setConfirmLoading(false);
      return;
    }
    if (user.phoneNumber === "") {
      setValidationStatus("phoneNumber");
      setConfirmLoading(false);
      return;
    }
    if (user.location === "") {
      setValidationStatus("location");
      setConfirmLoading(false);
      return;
    }

    if (user.password === "") {
      setValidationStatus("password");
      setConfirmLoading(false);
      return;
    }

    if (mode === "create") {
      await handleCreate();
    } else {
      await handleUpdate();
    }

    setOpenResDialog(true);
    handleCancel(true);
    setConfirmLoading(false);
  };

  const handleCreate = async () => {
    const { data, success, message } = await UseCreateUser(formData);
    if (success) {
      resType.current = "success";
      cusomMsg.current = "User created successfully";
    } else {
      resType.current = "failure";
      cusomMsg.current = message;
    }
    resetForm();
  };

  const handleUpdate = async () => {
    const { data, success } = await UseUpdateUser(formData);
    if (success) {
      resType.current = "success";
      cusomMsg.current = "User updated successfully";
    } else {
      resType.current = "failure";
      cusomMsg.current = "User update failed";
    }
    resetForm();
  };

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        id: selectedUser.id,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        phoneNumber: selectedUser.phoneNumber,
        location: selectedUser.location,
        password: "$",
      });
    } else {
      setFormData({ ...init });
    }
  }, [selectedUser]);

  return (
    <>
      <ResDialog
        open={openResDialog}
        type={resType.current}
        msg={cusomMsg.current}
        onClose={() => setOpenResDialog(false)}
      />
      <form className="flex flex-col space-y-4 justify-center w-full">
        <div className="flex space-x-2">
          <InputX
            initialValue={formData?.firstName === "" ? "" : formData?.firstName}
            label="First Name"
            status={`${validationStatus === "firstName" ? "error" : ""}`}
            onChange={(value: any) => handleChanges("firstName", value)}
          />
          <InputX
            initialValue={formData?.lastName}
            label="Last Name"
            status={`${validationStatus === "lastName" ? "error" : ""}`}
            onChange={(value: any) => handleChanges("lastName", value)}
          />
        </div>
        <EmailX
          initialValue={formData?.email}
          label="Email"
          status={`${validationStatus === "email" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("email", value)}
        />
        <InputX
          initialValue={formData?.phoneNumber}
          label="Phone Number"
          status={`${validationStatus === "phoneNumber" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("phoneNumber", value)}
        />
        <InputX
          initialValue={formData?.location}
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
            onClick={async () => await handleValidation(formData)}
            confirmLoading={confirmLoading}
            text={mode === "create" ? "Save" : "Update"}
          />
        </footer>
      </form>
    </>
  );
}
