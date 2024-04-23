"use client";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { FilledButton, IconButton } from "@/components/common/buttons";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  btnLable: string;
  btnLable2?: string;
  disabled?: boolean;
  onClick: (e: any) => void;
}

export default function CardTitleWithButton({
  title,
  btnLable,
  btnLable2,
  disabled,
  onClick,
}: Props) {
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="flex" style={{ justifyContent: "space-between" }}>
        <h1>{title}</h1>
        <div className="space-x-3">
          <FilledButton
            size="middle"
            onClick={onClick}
            icon={<PlusOutlined />}
            text={btnLable}
            color="#0058A9"
            disabled={disabled}
          />
          {btnLable2 && (
            <FilledButton
              size="middle"
              onClick={() => router.push('/campaign/list')}
              icon={<EyeOutlined />}
              text={btnLable2}
              color="#0058A9"
            />
          )}
        </div>
      </div>
    </div>
  );
}
