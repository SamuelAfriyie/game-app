// "use client";
import { UseCreateResult, UseEventSubInfo } from "@/hooks/common/use_results";
import { getDay, getMonthName } from "@/utils/func/date_extensions";
import { CSSProperties, useState } from "react";
import Spinner from "../common/spinner";
import { useClientSession } from "@/hooks/custom/use_session";
import Link from "next/link";
import { useTimer } from "@/utils/db/useTimer";
import { encryptData } from "@/utils/func/encrypt";
import { useRouter } from "next/navigation";
import { useEncrypt } from "@/utils/db/useEncrypt";

interface DecisionProps {
  decision?: "START" | "CONGRAT" | "FAILED" | "TRY_AGAIN";
}

interface GameEventProps {
  onClick: () => void;
  startDate: string;
  endDate: string;
  eventName: string;
}

function GameEventHeader({
  startDate,
  endDate,
  eventName,
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
    <section
      className={`${
        compareEventDate() ? "bg-white" : "bg-gray-400"
      } shadow-lg rounded-t-md`}
    >
      <div className="pt-2 pl-4 ">
        <p className="font-semibold text-base">{eventName}</p>
      </div>
      <div
        className={`w-full h-24 p-8 flex space-x-4 items-center justify-between `}
        onClick={() => compareEventDate() && onClick()}
      >
        <div className="text-center">
          <p style={{ fontSize: 12 }}>Start Date</p>
          <p className="text-base font-semibold my-2">
            {formatDate(startDate)}{" "}
          </p>
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
            {compareEventDate() ? "Active" : "Closed"}
          </p>
        </div>
      </div>
    </section>
  );
}

interface GameEventInfoProps extends DecisionProps {
  eventId: string;
  attemptsLeft: number;
  levelObtained?: number;
  userId: string;
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
  userId,
}: GameEventInfoProps) {
  const router = useRouter();

  const getKeyFunc = useEncrypt((state) => state.getKey);

  const encryptedUrlParam = () => {
    const key = getKeyFunc().key;
    const id = encryptData(eventId, key); 
    const user = encryptData(userId, key);

    return `/launch?id=${id}&user=${user}`;
  };

  const checkDecision = (decision: string, eventId: string) => {
    switch (decision) {
      case "START":
        return (
          <>
            {/* <Link href={`/launch?id=${encrptParam()}`} className="text-white ">
              {" "}
              Start
            </Link> */}
            <p
              className="text-white"
              onClick={async () => router.push(encryptedUrlParam())}
            >
              Start
            </p>
          </>
        );
      case "CONGRATS":
        return <p className="text-white">Congrats!</p>;
      case "FAILED":
        return <p className="text-white">Failed</p>;
      case "TRY_AGAIN":
        return (
          <>
            {/* <Link href={`/launch?id=${encrptParam()}`} className="text-white ">
              {" "}
              Try Again
            </Link> */}

            <p
              className="text-white"
              onClick={async () => router.push(encryptedUrlParam())}
            >
              Try Again
            </p>
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
        <p className="text-base font-semibold my-1">{attemptsLeft}</p>
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
          {checkDecision(
            decision === "TRY_AGAIN" && attemptsLeft <= 0
              ? "FAILED"
              : !decision
              ? "START"
              : decision,
            eventId
          )}
        </p>
      </div>
    </div>
  );
}

interface GameProps extends DecisionProps, GameEventProps {
  eventId: string;
  name?: string;
  attemptsLeft: number;
  levelObtained?: number;
  duration: number;
  passScore?: number;
}

export function GameEvent({
  eventId,
  name,
  startDate,
  endDate,
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
          userId={uId}
        />
      );
    } else {
      return (
        <GameEventInfo
          attemptsLeft={data?.attemptCount}
          levelObtained={data?.level}
          decision={data?.decision}
          eventId={eventId}
          userId={uId}
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
          eventName={name as string}
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
