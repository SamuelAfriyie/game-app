import React, { useState } from "react";
import { Button, Modal } from "antd";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  content?: React.ReactNode;
  size?: string;
}

const DefaultModal = ({ open, setOpen, content , size}: Props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        
      >
        {content}
      </Modal>
    </>
  );
};

export default DefaultModal;
