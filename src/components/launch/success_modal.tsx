"use client";
import { Image, Modal } from "antd";
import { useState } from "react";
import { FilledButton } from "../common/buttons";
import { useRouter } from "next/navigation";
import { useGameController } from "@/utils/db/useGameController";
import { UseAddNewAttempt } from "@/hooks/common/use_results";

interface Props {
  eventId: string;
  trigger?: boolean;
  content?: React.ReactNode;
  width?: number;
}

export default function SuccessModal({ eventId, trigger, width }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(trigger ?? false);
  const { currentLevel, levelCompletionStatus, score } = useGameController(
    (state) => state.gameBoard
  );

  const handleCompletedClicked = async () => {
    const res = await UseAddNewAttempt(eventId, "CONGRATS", {
      level: currentLevel + 1,
      score: score,
    });
    if (res.success) {
      setOpen(false);
      router.replace("/");
    }
  };

  return (
    <Modal
      open={trigger ?? open}
      onCancel={() => setOpen(false)}
      width={width}
      footer={false}
      centered
      closable={false}
      maskClosable={false}
    >
      <div className="h-52 w-full mt-4 flex flex-col justify-center items-center space-y-4 mb-4">
        <Image
          src="./static/photos/congrats.png"
          alt="level"
          width={150}
          height={150}
          preview={false}
        />
        <p className="text-2xl font-semibold">Congratulations!</p>
        <FilledButton
          onClick={async () => await handleCompletedClicked()}
          text="Continue"
          className="w-full"
        />
      </div>
    </Modal>
  );
}
