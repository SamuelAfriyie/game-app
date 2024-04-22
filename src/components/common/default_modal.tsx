import React, { ReactNode, useState } from "react";
import { FormInstance, Modal } from "antd";
import { FilledButton, OutlinedButton, SaveButton } from "./buttons";
import { UseFormReturn } from "react-hook-form";

interface Props {
  open: boolean;
  content?: React.ReactNode;
  width?: number;
  title?: string;
  showFooter?: boolean;
  // form?: FormInstance;
  form?: UseFormReturn<any, any, undefined>;
  setOpen: (v: boolean) => void;
  handleSave?: () => void;
}
interface FooterProps {
  confirmLoading?: boolean;
  // form?: FormInstance;

  form?: UseFormReturn<any, any, undefined>;
  handleSaveFunc: () => void;
  handleCancel: () => void;
}

const DefaultModal = ({
  open,
  content,
  width,
  title,
  showFooter = false,
  form,
  setOpen,
  handleSave,
}: Props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSaveFunc = () => {
    // handleSave!();
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
        width={width}
        // onOk={handleSaveFunc}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel} 
        footer={
          showFooter ? (
            <Footer
              handleSaveFunc={handleSaveFunc}
              handleCancel={handleCancel}
              confirmLoading={confirmLoading}
              form={form}
            />
          ) : null
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
        // form={form}
        onClick={handleSaveFunc}
        confirmLoading={confirmLoading}
      />
    </footer>
  );
};

export default DefaultModal;
