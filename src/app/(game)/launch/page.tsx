"use client";
// import boards from "@/utils/config/data.json";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { GetEventById } from "@/hooks/common/use_event";
import Spinner from "@/components/common/spinner";

const DynamicModal = dynamic(() => import("@/components/launch/res_modal"), {
  ssr: false,
});
const DynamicGame = dynamic(() => import("@/utils/config/game"), {
  ssr: false,
});

export default function GameLaunch() {
  const params = useSearchParams();
  const id = params.get("id") as string;
  // const level: number = params.get("level") as any;

  const { data, isLoading, isError } = GetEventById(id);

  const [states, setStates] = useState<any>({
    // selectedBoard: "27",
    dragging: null,
  });

  const { dragging } = states;

  const updateState = (key: string, value: string) => {
    setStates({ ...states, [key]: value });
  };

  return (
    <>
      <Suspense>
        <DynamicModal width={350} level={1} eventId={id} />
      </Suspense>
      <div className="h-full w-full overflow-y-hidden">
        <div className={`App ${dragging ? "dragging" : ""} `}>
          {isLoading ? (
            <Spinner />
          ) : (
            <DynamicGame
              key={data[0]?.Id}
              setDragging={(which: any) => updateState("dragging", which)}
              board={data?.find((b: any) => b.Id === data[0]?.Id)}
            />
          )}
        </div>
      </div>
    </>
  );
}
