"use client";
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

function GameLaunchInner() {
  const params = useSearchParams();
  const id = params.get("id") as string;

  const { data, isLoading, isError } = GetEventById(id);

  const [states, setStates] = useState<any>({
    dragging: null,
  });

  const { dragging } = states;

  const updateState = (key: string, value: string) => {
    setStates({ ...states, [key]: value });
  };

  return (
    <>
      <DynamicModal width={350} level={1} eventId={id} />
      <div className="h-full w-full overflow-y-hidden">
        <div className={`App ${dragging ? "dragging" : ""} `}>
          {isLoading ? (
            <Spinner />
          ) : (
            <DynamicGame
              key={data[0]?.Id}
              setDragging={(which: any) => updateState("dragging", which)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default function GameLaunch() {
  return (
    <Suspense fallback={<Spinner />}>
      <GameLaunchInner />
    </Suspense>
  );
}
