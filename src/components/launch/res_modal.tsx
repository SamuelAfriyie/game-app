// "use client";
import {
  UseAddNewAttempt,
  UseDecrementAttemptCount,
} from "@/hooks/common/use_results";
import { useGameController } from "@/utils/db/useGameController";
import { useTimer } from "@/utils/db/useTimer";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  trigger?: boolean;
  eventId: string;
  content?: React.ReactNode;
  width?: number;
  title?: string;
  isOver?: boolean;
  handleCancel?: () => void;
}

export default function ResModal({ trigger, eventId, width, isOver }: Props) {
  const router = useRouter();
  const { currentLevel, levelCompletionStatus, score } = useGameController(
    (state) => state.gameBoard
  );

  const startTimer = useTimer((state: any) => state.startTimer);
  const changeGameStatus = useTimer((state: any) => state.updateTimer);
  const [open, setOpen] = useState<boolean>(trigger ?? true);

  const handleProceed = async () => {
    if (trigger && !isOver) {
      setOpen(false);
    } else {
      const { success } = await UseDecrementAttemptCount(eventId);
      if (success) {
        startTimer();
        setOpen(false);
      }
    }
  };

  const handleFailedClicked = async () => {
    const res = await UseAddNewAttempt(eventId, "TRY_AGAIN", {
      level: currentLevel,
      score: score,
    });
    if (res.success) {
      setOpen(false);
      router.replace("/");
    }
    changeGameStatus("isOver", false);
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={width}
      footer={false}
      centered
      closable={false}
      maskClosable={false}
    >
      <div className="h-24 w-full mt-4 flex flex-col justify-center items-center">
        <p className="text-2xl font-semibold">
          {!isOver ? `LEVEL ${currentLevel + 1}` : "Game Over"}
        </p>
        {!isOver ? (
          <p
            className="mt-2 cursor-pointer hover:text-blue-600"
            onClick={async () => await handleProceed()}
          >
            proceed
          </p>
        ) : (
          <p
            className="mt-2 cursor-pointer hover:text-blue-600"
            onClick={async () => await handleFailedClicked()}
          >
            Return
          </p>
        )}
      </div>
    </Modal>
  );
}
