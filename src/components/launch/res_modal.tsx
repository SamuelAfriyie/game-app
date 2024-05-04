// "use client";
import {
  UseCreateResult,
  UseDecrementAttempt,
} from "@/hooks/common/use_results";
import { useTimer } from "@/utils/db/useTimer";
import { Modal } from "antd";
import { useState } from "react";

interface Props {
  eventId: string;
  content?: React.ReactNode;
  width?: number;
  level: number;
  title?: string;
  isOver?: boolean;
  handleCancel?: () => void;
}

export default function ResModal({ eventId, width, level, isOver }: Props) {
  const startTimer = useTimer((state: any) => state.startTimer);
  const [open, setOpen] = useState<boolean>(true);

  const handleProceed = async () => {
    const { success } = await UseDecrementAttempt(eventId);
    //if true it means we have successfully decremented the attempt
    //so we can proceed to the game
    if (success) {
      const interval: NodeJS.Timeout = startTimer();
      setOpen(false);
    }
       console.log("Success", success);
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
        <p className="text-2xl font-semibold">{isOver ?? `LEVEL ${level}`}</p>
        {!isOver ? (
          <p
            className="mt-2 cursor-pointer hover:text-blue-600"
            onClick={async () => handleProceed()}
          >
            proceed
          </p>
        ) : null}
      </div>
    </Modal>
  );
}
