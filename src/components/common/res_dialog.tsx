import React from "react";
import { Modal } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

interface ResDialogProps {
  open: boolean;
  type: "success" | "failure";
  onClose: () => void;
}

interface ResDialogProps {
  open: boolean;
  type: "success" | "failure";
  onClose: () => void;
}

const ResDialog: React.FC<ResDialogProps> = ({ open, type, onClose }) => {
  const title = type === "success" ? "Success" : "Failure";
  const content =
    type === "success"
      ? "Operation completed successfully."
      : "Operation failed. Please try again.";

  return (
    <Modal
      open={open}
      title={title}
      onCancel={onClose}
      footer={null}
      width={320}
      centered
    >
      <div className="flex flex-col items-center space-y-1">
        {type === "success" ? (
          <div style={{ fontSize: 50, color: "#0058A9" }}>
            <CheckCircleOutlined />
          </div>
        ) : (
          <div className="text-red-700" style={{ fontSize: 50 }}>
            <CloseCircleOutlined />
          </div>
        )}
        <p className="font-semibold text-base">{content}</p>
        <div className="res-dialog-actions">
          {type === "success" ? (
            <button className="res-dialog-button" onClick={onClose}>
              Close
            </button>
          ) : (
            <div>
              <button className="res-dialog-button retry-button">Retry</button>
              <button
                className="res-dialog-button cancel-button"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ResDialog;
