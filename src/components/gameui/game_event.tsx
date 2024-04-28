// "use client";
import { getDay, getMonth, getMonthName } from "@/utils/func/date_extensions";
import { CSSProperties, useState } from "react";

interface DecisionProps {
  decision?: "Start" | "Congrats!" | "Failed" | "Try Again";
}

interface GameEventProps {
  onClick: () => void;
  startDate: string;
  endDate: string;
  status?: string;
}

function GameEventHeader({
  startDate,
  endDate,
  status,
  onClick,
}: GameEventProps) {
  const formatDate = (date: string) => {
    return `${getMonthName(date)} ${getDay(date)}`;
  };
  return (
    <div
      className="w-full h-24 bg-white shadow-lg p-8 flex space-x-4 items-center justify-between rounded-t-md"
      onClick={onClick}
    >
      <div className="text-center">
        <p style={{ fontSize: 12 }}>Start Date</p>
        <p className="text-base font-semibold my-2">{formatDate(startDate)} </p>
      </div>
      <div className="w-0.5 h-8 bg-gray-500" />
      <div className="text-center">
        <p style={{ fontSize: 12 }}>End Date</p>
        <p className="text-base font-semibold my-2">{formatDate(endDate)}</p>
      </div>
      <div className="w-0.5 h-8 bg-gray-500" />
      <div className="text-center">
        <p style={{ fontSize: 12 }}>Status</p>
        <p className="text-base font-semibold my-2">{status ?? "Not Started"}</p>
      </div>
    </div>
  );
}

interface GameEventInfoProps extends DecisionProps {
  attemptsLeft?: number;
  levelObtained?: number;
}

const attemptsStyle: CSSProperties = {
  backgroundImage: "url('./static/img/shape.png')",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

function GameEventInfo({
  attemptsLeft,
  levelObtained,
  decision,
}: GameEventInfoProps) {
  
  return (
    <div
      className="w-full h-20 px-8 flex space-x-4 items-center justify-between rounded-b-md"
      style={{ backgroundColor: "#0058A9", color: "white" }}
    >
      <div
        className="flex flex-col w-24 min-w-12 text-center py-2 pr-4 text-black"
        style={attemptsStyle}
      >
        <p style={{ fontSize: 10 }}>Attempts Left</p>
        <p className="text-base font-semibold my-1">{attemptsLeft ?? 6}</p>
      </div> 
      <div className="w-0.5 h-8 bg-white" />
      <div className="text-center">
        <p style={{ fontSize: 10 }}>Level Obtained</p>
        <p className="text-base font-semibold my-2">{levelObtained ?? "_"}</p>
      </div>
      <div className="w-0.5 h-8 bg-white" />
      <div className="text-center">
        <p style={{ fontSize: 10 }}>Decision</p>
        <p className="text-base font-semibold my-2">{decision ?? "Start"}</p>
      </div>
    </div>
  );
}

interface GameProps extends DecisionProps, GameEventProps {
  attemptsLeft?: number;
  levelObtained?: number;
}

export function GameEvent({
  startDate,
  endDate,
  status,
  attemptsLeft,
  levelObtained,
  decision,
  onClick,
}: GameProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <section className="w-96 cursor-pointer">
        <GameEventHeader
          onClick={handleOpen}
          startDate={startDate}
          endDate={endDate}
          status={status}
        />
        {open && (
          <GameEventInfo
            attemptsLeft={attemptsLeft}
            levelObtained={levelObtained}
            decision={decision}
          />
        )}
      </section>
    </>
  );
}
