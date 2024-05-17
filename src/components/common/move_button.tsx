import { Button } from "antd";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";

interface Props {
  disabled?: boolean;
  onClick: () => void;
}

export default function MoveButton({ disabled, onClick }: Props) {
  return (
    <Button
      icon={<DoubleRightOutlined />}
      size="large"
      disabled={disabled}
      style={{ height: 660, backgroundColor: "#0058A9", color: "white" }}
      onClick={onClick}
    />
  );
}
