import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

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
            icon={<DownloadOutlined />}
            style={{ width: 'auto' }}
            type="primary"
          >
            {btnLable}
          </Button>
        </div>
      </div>
    </div>
  );
}
