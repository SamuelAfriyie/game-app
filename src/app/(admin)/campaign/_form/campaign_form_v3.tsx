import { OutlinedButton, SaveButton } from "@/components/common/buttons";
import { InputNumberX, InputX } from "@/components/common/input";
import ResDialog from "@/components/common/res_dialog";
import {
  UseCreateCampaign,
  UseUpdateCampaign,
} from "@/hooks/common/use_campaign";
import { CampaignFormType } from "@/lib/zod/formvalidations";
import { useCampaignData } from "@/utils/db/useUpdateCampaign";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface Props {
  handleCancel: (v: boolean) => void;
  isUpdateMode: boolean;
  selectedGames: any[];
}

export default function CampaignFormV3({
  selectedGames,
  isUpdateMode,
  handleCancel,
}: Props) {
  const campaignToUpdate = useCampaignData(
    (state) => state.campaignData.campaign
  );
  const resetMode = useCampaignData((state) => state.resetUpdateMode);

  const formData = useRef<CampaignFormType>({
    name: isUpdateMode ? campaignToUpdate.name : "",
    passScore: isUpdateMode ? campaignToUpdate.passScore : 0,
    duration: isUpdateMode ? campaignToUpdate.duration : 0,
    numOfAttempts: isUpdateMode ? campaignToUpdate.numOfAttempts : 0,
    games: selectedGames,
  });

  const [validationStatus, setValidationStatus] = useState<string>("");
  const [openResDialog, setOpenResDialog] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [refreshForm, setRefreshForm] = useState<boolean>(false);
  const router = useRouter();

  const resType = useRef<"success" | "failure">("failure");

  const handleChanges = (name: string, value: string | number) => {
    formData.current = { ...formData.current, [name]: value };
    setRefreshForm(!refreshForm);
    if (validationStatus === name) setValidationStatus("");
  };

  const handleValidation = async (campaign: CampaignFormType) => {
    setConfirmLoading(true);
    if (campaign.name === "") {
      setValidationStatus("name");
      setConfirmLoading(false);
      return;
    }
    if (campaign.passScore === 0 || campaign.passScore === undefined) {
      setValidationStatus("passScore");
      setConfirmLoading(false);
      return;
    }
    if (campaign.duration === 0 || campaign.passScore === undefined) {
      setValidationStatus("duration");
      setConfirmLoading(false);
      return;
    }
    if (campaign.numOfAttempts === 0 || campaign.passScore === undefined) {
      setValidationStatus("numOfAttempts");
      setConfirmLoading(false);
      return;
    }

    if (!isUpdateMode) {
      const { data, success } = await UseCreateCampaign(formData.current);
      if (success) {
        resType.current = "success";
      } else {
        resType.current = "failure";
      }
    } else {
      const { data, success } = await UseUpdateCampaign({
        ...formData.current,
        id: campaignToUpdate.id,
      });
      if (success) {
        resType.current = "success";
      } else {
        resType.current = "failure";
      }
    }
    setOpenResDialog(true);
    handleCancel(true);
    setConfirmLoading(false);
  };

  const handleInUpdateModeCloseModal = () => {
    setOpenResDialog(false);
    if (isUpdateMode) {
      resetMode();
      router.push("/campaign/list");
    }
  };

  return (
    <>
      <ResDialog
        open={openResDialog}
        type={resType.current}
        msg={`Campaign ${isUpdateMode ? "updated" : "created"} successfully.`}
        onClose={handleInUpdateModeCloseModal}
      />
      <form className="flex flex-col space-y-4 justify-center w-full">
        <InputX
          label="Name"
          status={`${validationStatus === "name" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("name", value)}
          initialValue={formData.current.name}
        />
        <InputNumberX
          label="Pass Score"
          status={`${validationStatus === "passScore" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("passScore", value)}
          initialValue={formData.current.passScore?.toString()}
        />
        <InputNumberX
          label="Duration"
          status={`${validationStatus === "duration" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("duration", value)}
          initialValue={formData.current.duration?.toString()}
        />
        <InputNumberX
          label="Number Of Attempts"
          status={`${validationStatus === "numOfAttempts" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("numOfAttempts", value)}
          initialValue={formData.current.numOfAttempts?.toString()}
        />
        <footer className="flex justify-end">
          <OutlinedButton className="mr-3" onClick={handleCancel} />
          {isUpdateMode ? (
            <SaveButton
              onClick={() => handleValidation(formData.current)}
              confirmLoading={confirmLoading}
              text="Update"
            />
          ) : (
            <SaveButton
              onClick={() => handleValidation(formData.current)}
              confirmLoading={confirmLoading}
            />
          )}
        </footer>
      </form>
    </>
  );
}
