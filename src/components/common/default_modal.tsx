import React, { ReactNode, useState } from "react";
import { FormInstance, Modal } from "antd";
import { FilledButton, OutlinedButton, SaveButton } from "./buttons";

interface Props {
  open: boolean;
  content?: React.ReactNode;
  size?: string;
  title?: string;
  form?: FormInstance;
  setOpen: (v: boolean) => void;
  handleSave?: () => void;
}
interface FooterProps {
  confirmLoading?: boolean;
  form?: FormInstance;
  handleSaveFunc: () => void;
  handleCancel: () => void;
}

const DefaultModal = ({
  open,
  content,
  size,
  title,
  form,
  setOpen,
  handleSave,
}: Props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSaveFunc = () => {
    handleSave!();
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={title}
        open={open}
        // onOk={handleSaveFunc}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={
          <Footer
          handleSaveFunc={handleSaveFunc}
            handleCancel={handleCancel}
            confirmLoading={confirmLoading}
            form={form}
          />
        }
      >
        {content}
      </Modal>
    </>
  );
};

const Footer = ({
  handleSaveFunc,
  handleCancel,
  confirmLoading,
  form,
}: FooterProps) => {
  return (
    <footer>
      <OutlinedButton className="mr-3" onClick={handleCancel} />
      <SaveButton
        form={form}
        onClick={handleSaveFunc}
        confirmLoading={confirmLoading}
      />
    </footer>
  );
};

export default DefaultModal;
