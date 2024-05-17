"use client";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { GetEventById } from "@/hooks/common/use_event";
import Spinner from "@/components/common/spinner";
import { useGameController } from "@/utils/db/useGameController";
import { useTimer } from "@/utils/db/useTimer";
import { decryptQueryParam } from "@/utils/func/encrypt";
import { useEncrypt } from "@/utils/db/useEncrypt";
import { UseAnyUserById, UseCheckExistUserById } from "@/hooks/common/use_user";

const DynamicModal = dynamic(() => import("@/components/launch/res_modal"), {
  ssr: false,
});
const DynamicSuccessModal = dynamic(
  () => import("@/components/launch/success_modal"),
  {
    ssr: false,
  }
);
const DynamicGame = dynamic(() => import("@/utils/config/game"), {
  ssr: false,
});

function GameLaunchInner() {
  const router = useRouter();
  const params = useSearchParams();
  const key = useEncrypt((state) => state.keyStore.key);
  const id = decryptQueryParam(params.get("id") as string, key);
  const userId = decryptQueryParam(params.get("user") as string, key);

  useEffect(() => {
    async function checkIfUserExist() {
      const { data } = await UseCheckExistUserById(userId);
      console.log(data);
      if (!data) {
        router.replace("/started");
      }
    }
    checkIfUserExist();
  }, [router, userId]);

  const { currentLevel } = useGameController((state) => state.gameBoard);
  const incrementLevel = useGameController((state) => state.incrementLevel);
  const addScore = useGameController((state) => state.addScore);
  const isOver = useTimer((state) => state.timeStore.isOver);

  const { data, isLoading } = GetEventById(id);

  const [states, setStates] = useState<any>({
    dragging: null,
  });

  const { dragging } = states;

  const updateState = (key: string, value: string) => {
    setStates({ ...states, [key]: value });
  };

  const handleLevelCompletion = () => {
    incrementLevel();
    addScore(Number(data[checkIfOver()]?.PointAllocated));
  };

  const checkIfOver = () => {
    return currentLevel === data.length ? data.length - 1 : currentLevel;
  };

  return (
    <>
      <Suspense>
        <DynamicModal
          width={350}
          eventId={id}
          trigger={currentLevel > 0 || isOver ? true : undefined}
          isOver={isOver}
        />
        <DynamicSuccessModal
          eventId={id}
          width={300}
          trigger={currentLevel === data?.length ? true : undefined}
        />
      </Suspense>
      <div className="h-full w-full overflow-y-hidden">
        <div className={`App ${dragging ? "dragging" : ""} `}>
          {isLoading ? (
            <Spinner />
          ) : (
            <DynamicGame
              key={data[checkIfOver()]?.Id}
              setDragging={(which: any) => updateState("dragging", which)}
              board={data[checkIfOver()]}
              incrementLevel={handleLevelCompletion}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default function GameLaunch() {
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    const handleUnload = (e: Event) => {
      localStorage.setItem("refreshed", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("refreshed")) {
      localStorage.removeItem("refreshed");
      router.replace("/started");
    }
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <GameLaunchInner />
    </Suspense>
  );
}
