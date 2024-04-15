import { Button } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";

interface Props {
  onClick: () => void;
}

export default function MoveButton({ onClick }: Props) {
  return (
    <Button
      icon={<DoubleRightOutlined />}
      size="large"
      style={{ height: 450 }}
      // style={{ height: "100%" }}
      onClick={onClick}
    ></Button>
  );
}
