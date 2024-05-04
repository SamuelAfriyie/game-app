// "use client";
import { UseCreateResult, UseEventSubInfo } from "@/hooks/common/use_results";
import { getDay, getMonth, getMonthName } from "@/utils/func/date_extensions";
import { CSSProperties, use, useState } from "react";
import Spinner from "../common/spinner";
import { useClientSession } from "@/hooks/custom/use_session";
import Link from "next/link";
import { useTimer } from "@/utils/db/useTimer";

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

  const compareEventDate = (): boolean => {
    const currentDate = new Date();
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    return sDate <= currentDate && eDate >= currentDate;
  };

  return (
    <div
      className={`w-full h-24 ${
        compareEventDate() ? "bg-white" : "bg-gray-400"
      } shadow-lg p-8 flex space-x-4 items-center justify-between rounded-t-md`}
      onClick={() => compareEventDate() && onClick()}
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
        <p className="text-base font-semibold my-2">
          {status ?? "Not Started"}
        </p>
      </div>
    </div>
  );
}

interface GameEventInfoProps extends DecisionProps {
  eventId: string;
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
  eventId,
  attemptsLeft,
  levelObtained,
  decision,
}: GameEventInfoProps) {
  const checkDecision = (decision: string, eventId: string) => {
    switch (decision) {
      case "START":
        return (
          <>
            <Link href={`/launch?id=${eventId}`} className="text-white ">
              {" "}
              Start
            </Link>
          </>
        );
      case "CONGRAT":
        return <p className="text-white">Congrats!</p>;
      case "Failed":
        return <p className="text-white">Failed</p>;
      case "TRY_AGAIN":
        return (
          <>
            <Link href={`/launch?id=${eventId}`} className="text-white ">
              {" "}
              Start
            </Link>
          </>
        );
      default:
        return <p className="text-white">_</p>;
    }
  };

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
        <p className="text-base font-semibold my-2">
          {checkDecision(decision ?? "START", eventId)}
        </p>
      </div>
    </div>
  );
}

interface GameProps extends DecisionProps, GameEventProps {
  eventId: string;
  name?: string;
  attemptsLeft?: number;
  levelObtained?: number;
  duration: number;
  passScore?: number;
}

export function GameEvent({
  eventId,
  name,
  startDate,
  endDate,
  status,
  attemptsLeft,
  levelObtained,
  decision,
  duration,
  passScore,
}: GameProps) {
  const updateTimer = useTimer((state: any) => state.updateTimer);
  const uId = useClientSession("id") as string;
  const { data, isLoading, isError } = UseEventSubInfo(eventId, uId);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = async () => {
    updateTimer("time", duration ?? 0);
    if (data === undefined || data === null) {
      const { success } = await UseCreateResult({
        eventId: eventId,
        userId: uId,
        decision: "START",
        level: 0,
        attemptCount: attemptsLeft as number,
        eventName: name as string,
        score: 0,
        passScore: passScore,
        attempts: [],
      });
      if (success) {
        setOpen(!open);
      }
    } else {
      setOpen(!open);
    }
  };

  const getDataInfo = () => {
    if (data === undefined || data === null) {
      return (
        <GameEventInfo
          attemptsLeft={attemptsLeft}
          levelObtained={levelObtained}
          decision={decision}
          eventId={eventId}
        />
      );
    } else {
      return (
        <GameEventInfo
          attemptsLeft={data?.attemptCount}
          levelObtained={data?.level}
          decision={data?.decision}
          eventId={eventId}
        />
      );
    }
  };

  return (
    <>
      <section className="w-96 cursor-pointer">
        <GameEventHeader
          onClick={async () => handleOpen()}
          startDate={startDate}
          endDate={endDate}
          status={status}
        />
        {open &&
          (!isLoading ? (
            getDataInfo()
          ) : (
            <div className="w-full h-24 text-white">
              <Spinner />
            </div>
          ))}
      </section>
    </>
  );
}
