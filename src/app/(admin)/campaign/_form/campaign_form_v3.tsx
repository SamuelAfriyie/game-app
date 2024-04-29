import { OutlinedButton, SaveButton } from "@/components/common/buttons";
import { InputNumberX, InputX } from "@/components/common/input";
import ResDialog from "@/components/common/res_dialog";
import { UseCreateCampaign } from "@/hooks/common/use_campaign";
import { CampaignFormType } from "@/lib/zod/formvalidations";
import { useRef, useState } from "react";

interface Props {
  handleCancel: (v: boolean) => void;
  selectedRecordsFx: any[];
}

export default function CampaignFormV3({
  selectedRecordsFx,
  handleCancel,
}: Props) {
  const formData = useRef<CampaignFormType>({
    name: "",
    passScore: 0,
    duration: 0,
    numOfAttempts: 0,
    games: selectedRecordsFx,
  });

  const [validationStatus, setValidationStatus] = useState<string>("");
  const [openResDialog, setOpenResDialog] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const resType = useRef<"success" | "failure">("failure");

  const handleChanges = (name: string, value: string | number) => {
    formData.current = { ...formData.current, [name]: value };
    if (validationStatus === name) setValidationStatus("");
  };

  const handleValidation = async (campaign: CampaignFormType) => {
    setConfirmLoading(true);
    if (campaign.name === "") {
      setValidationStatus("name");
      return;
    }
    if (campaign.passScore === 0) {
      setValidationStatus("passScore");
      return;
    }
    if (campaign.duration === 0) {
      setValidationStatus("duration");
      return;
    }
    if (campaign.numOfAttempts === 0) {
      setValidationStatus("numOfAttempts");
      return;
    }

    
    const { data, success } = await UseCreateCampaign(formData.current);
    if (success) {
      resType.current = "success";
    } else {
      resType.current = "failure";
    }
    setOpenResDialog(true);
    handleCancel(true);
    setConfirmLoading(false);
  };

  return (
    <>
      <ResDialog
        open={openResDialog}
        type={resType.current}
        onClose={() => setOpenResDialog(false)}
      />
      <form className="flex flex-col space-y-4 justify-center w-full">
        <InputX
          label="Name"
          status={`${validationStatus === "name" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("name", value)}
        />
        <InputNumberX
          label="Pass Score"
          status={`${validationStatus === "passScore" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("passScore", value)}
        />
        <InputNumberX
          label="Duration"
          status={`${validationStatus === "duration" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("duration", value)}
        />
        <InputNumberX
          label="Number Of Attempts"
          status={`${validationStatus === "numOfAttempts" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("numOfAttempts", value)}
        />
        <footer className="flex justify-end">
          <OutlinedButton className="mr-3" onClick={handleCancel} />
          <SaveButton onClick={() => handleValidation(formData.current)} confirmLoading={confirmLoading} />
        </footer>
      </form>
    </>
  );
}
