import { CreateCampaign } from "@/app/actions/form";
import { OutlinedButton, SaveButton } from "@/components/common/buttons";
import { InputNumberX, InputX } from "@/components/common/input";
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

  const handleChanges = (name: string, value: string | number) => {
    formData.current = { ...formData.current, [name]: value };
    if (validationStatus === name) setValidationStatus("");
  };

  const handleValidation = (data: CampaignFormType) => {
    if (data.name === "") {
      setValidationStatus("name");
      return;
    }
    if (data.passScore === 0) {
      setValidationStatus("passScore");
      return;
    }
    if (data.duration === 0) {
      setValidationStatus("duration");
      return;
    }
    if (data.numOfAttempts === 0) {
      setValidationStatus("numOfAttempts");
      return;
    }

    CreateCampaign(formData.current);
  };

  return (
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
        <SaveButton onClick={() => handleValidation(formData.current)} />
      </footer>
    </form>
  );
}
