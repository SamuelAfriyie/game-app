import { PlusOutlined } from "@ant-design/icons";
import { FilledButton } from "@/components/common/buttons";

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
          <FilledButton
            size="middle"
            onClick={onClick}
            icon={<PlusOutlined />}
            text={btnLable}
            color="#0058A9"
          />
        </div>
      </div>
    </div>
  );
}
