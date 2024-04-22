import { Button, Form, FormInstance } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { UseFormReturn } from "react-hook-form";
import { set } from "zod";
interface Props {
  text?: string;
  className?: string;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  onClick?: (e: any) => void;
  icon?: ReactNode;
  color?: string;
  confirmLoading?: boolean;
  htmlType?: "submit";
}

export const FilledButton = ({
  text,
  disabled,
  className,
  size,
  icon,
  color,
  confirmLoading,
  htmlType,
  onClick,
}: Props) => {
  return (
    <Button
      className={className}
      size={size}
      icon={icon}
      loading={confirmLoading}
      htmlType={htmlType}
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: color ?? "#013D84",
        minWidth: 110,
        color: "white",
      }}
    >
      {text ?? "Save"}
    </Button>
  );
};

export const OutlinedButton = ({
  text,
  className,
  size,
  icon,
  onClick,
}: Props) => {
  return (
    <Button
      className={className}
      size={size}
      icon={icon}
      onClick={onClick}
      style={{ borderColor: "#013D84", minWidth: 110, color: "#013D84" }}
    >
      {text ?? "Cancel"}
    </Button>
  );
};

export const IconButton = ({ className, size, icon, onClick }: Props) => {
  return (
    <Button
      className={className}
      size={size}
      onClick={onClick}
      icon={icon ?? <EyeOutlined />}
      style={{ backgroundColor: "#0058A9", color: "white" }}
    />
  );
};


export const SaveButton: React.FC<React.PropsWithChildren<Props>> = ({
  confirmLoading,
  onClick, 
}) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  return (
    <FilledButton
      htmlType="submit"
      confirmLoading={confirmLoading}
    />
  );
};
