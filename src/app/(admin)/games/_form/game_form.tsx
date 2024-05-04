import { UpdateGame } from "@/app/actions/form";
import { OutlinedButton, SaveButton } from "@/components/common/buttons";
import { InputNumberX, InputX } from "@/components/common/input";
import ResDialog from "@/components/common/res_dialog";
import { UseGameUpdate } from "@/hooks/common/use_games";
import { GameFormType } from "@/lib/zod/formvalidations";
import { useRef, useState } from "react";

interface Props {
  handleCancel: (v: boolean) => void;
  selectedRecord: GameFormType;
}

export default function GameForm({ selectedRecord, handleCancel }: Props) {
  const formData = useRef<GameFormType>({ ...selectedRecord });

  const [validationStatus, setValidationStatus] = useState<string>("");
  const [openResDialog, setOpenResDialog] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const resType = useRef<"success" | "failure">("failure");

  const handleChanges = (name: string, value: string) => {
    formData.current = { ...formData.current, [name]: value };
    if (validationStatus === name) setValidationStatus("");
  };

  const handleValidation = async (game: GameFormType) => {
    if (game.Title === "") {
      setValidationStatus("Title");
      return;
    }
    if (game.Difficulty === "") {
      setValidationStatus("Difficulty");
      return;
    }
    if (game.PointAllocated === "") {
      setValidationStatus("PointAllocated");
      return;
    }
    if (game.RateOfCompletion === "") {
      setValidationStatus("RateOfCompletion");
      return;
    }

    const { data, success } = await UseGameUpdate(formData.current);
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
          initialValue={selectedRecord?.Title}
          label="Name"
          status={`${validationStatus === "Title" ? "error" : ""}`}
          onChange={(value: any) => handleChanges("Title", value)}
        />
        <InputNumberX
          initialValue={selectedRecord?.Difficulty}
          label="Difficulty"
          status={`${validationStatus === "Difficulty" ? "error" : ""}`}
          onChange={(value: any) =>
            handleChanges("Difficulty", value.toString())
          }
        />
        <InputNumberX
          initialValue={selectedRecord?.PointAllocated.toString()}
          label="Points Allocated"
          status={`${validationStatus === "PointAllocated" ? "error" : ""}`}
          onChange={(value: any) =>
            handleChanges("PointAllocated", value.toString())
          }
        />
        <InputNumberX
          initialValue={selectedRecord?.RateOfCompletion.toString()}
          label="Rate Of Completion"
          status={`${validationStatus === "RateOfCompletion" ? "error" : ""}`}
          onChange={(value: any) =>
            handleChanges("RateOfCompletion", value.toString())
          }
        />
        <footer className="flex justify-end">
          <OutlinedButton className="mr-3" onClick={handleCancel} />
          <SaveButton
            onClick={() => handleValidation(formData.current)}
            text="Update"
            confirmLoading={confirmLoading}
          />
        </footer>
      </form>
    </>
  );
}
