import React, { useState } from "react";
import { Modal } from "antd";
import { OutlinedButton, SaveButton } from "./buttons"; 
interface Props {
  open: boolean;
  // content?: React.ReactNode;
  content?: JSX.Element;
  width?: number;
  title?: string;
  showFooter?: boolean;
  setOpen: (v: boolean) => void;
  handleSave?: () => void;
}
interface FooterProps {
  confirmLoading?: boolean;
  handleSaveFunc: () => void;
  handleCancel: () => void;
}

const DefaultModal = ({
  open,
  content,
  width,
  title,
  showFooter = false,
  setOpen,
  handleSave,
}: Props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSaveFunc = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => { 
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={title}
        open={open}
        width={width}
        onCancel={handleCancel}
        footer={
          showFooter ? (
            <Footer
              handleSaveFunc={handleSaveFunc}
              handleCancel={handleCancel}
              confirmLoading={confirmLoading}
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
}: FooterProps) => {
  return (
    <footer>
      <OutlinedButton className="mr-3" onClick={handleCancel} />
      <SaveButton onClick={handleSaveFunc} confirmLoading={confirmLoading} />
    </footer>
  );
};

export default DefaultModal;
