import { useTimer } from "@/utils/db/useTimer";
import { GiSandsOfTime } from "react-icons/gi";

interface TimerProps {
  timer?: number;
}

export default function Timer({ timer }: TimerProps) {
  const time = useTimer((state) => state.timeStore);
  const checkTime = (time: number) => {
    if (time < 10) {
      return `0${time}`;
    }
    return time;
  };

  return (
    <div className="flex items-center">
      <GiSandsOfTime
        style={{
          fontSize: 28,
          color: "white",
          marginRight: 5,
          fontWeight: "bolder",
        }}
      />
      <p className="text-white text-2xl font-bold">
        {checkTime(timer ?? time.time)}:{checkTime(timer ?? time.seconds)}
      </p>
    </div>
  );
}
