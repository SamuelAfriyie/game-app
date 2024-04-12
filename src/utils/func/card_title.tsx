import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";

interface Props {
  title: string;
  btnLable: string;
  onClick: (e: any) => void;
}

export default function CardTitleWithButton({
  title,
  btnLable,
  onClick,
}: Props) {
  return (
    <div className="w-full">
      <div className="flex" style={{ justifyContent: "space-between" }}>
        <h1>{title}</h1>
        <div>
          <Button
            size="small"
            onClick={onClick}
            icon={<SaveOutlined />}
            style={{ width: 120 }}
          >
            {btnLable}
          </Button>
        </div>
      </div>
    </div>
  );
}
