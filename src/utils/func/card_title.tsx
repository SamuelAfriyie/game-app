"use client";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { FilledButton, IconButton } from "@/components/common/buttons";
import { useRouter } from "next/navigation";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { useCampaignData } from "../db/useUpdateCampaign";

interface Props {
  title: string;
  btnLable: string;
  btnLable2?: string;
  disabled?: boolean;
  isUpdateMode: boolean;
  onClick: (e: any) => void;
}

export default function CardTitleWithButton({
  title,
  btnLable,
  btnLable2,
  disabled,
  isUpdateMode,
  onClick,
}: Props) {
  const router = useRouter();
  // const isUpdateMode = useCampaignData(
  //   (state) => state.campaignData.isUpdateMode
  // );

  return (
    <div className="w-full">
      <div className="flex " style={{ justifyContent: "space-between" }}>
        <h1>{title}</h1>
        <div className="space-x-3">
          {isUpdateMode ? (
            <FilledButton
              size="middle"
              onClick={onClick}
              icon={<MdOutlineSystemUpdateAlt size={13} />}
              text={"Update Campaign"}
              color="#0058A9"
              disabled={disabled}
            />
          ) : (
            <span className="space-x-3">
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
                  onClick={() => router.push("/campaign/list")}
                  icon={<EyeOutlined />}
                  text={btnLable2}
                  color="#0058A9"
                />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
