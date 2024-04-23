import { Button } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export default function MoveButton({disabled, onClick }: Props) {
  return (
    <Button
      icon={<DoubleRightOutlined />}
      size="large"
      disabled={disabled}
      style={{ height: 660, backgroundColor: "#0058A9", color: "white"}}
      onClick={onClick} 
    />
  );
}
