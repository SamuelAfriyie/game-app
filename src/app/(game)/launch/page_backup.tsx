"use client";
import boards from "@/utils/config/data.json";
import { useState } from "react";
import dynamic from "next/dynamic";

const DynamicGame = dynamic(() => import("@/utils/config/game"), {
  ssr: false,
});

export default function GameLaunchB() {
  const [states, setStates] = useState<any>({
    selectedBoard: "285",
    dragging: null,
  });

  const { selectedBoard, dragging } = states;

  const updateState = (key: string, value: string) => {
    setStates({ ...states, [key]: value });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className={`App ${dragging ? "dragging" : ""}`}>
        {/* <div className="boards"> */}
        
        {/* <div className="h-96s overflow-y-auto">
          {boards.map((d) => (
            <p
              key={`board-${d.Id}`}
              className={`${selectedBoard === d.Id ? "selected" : ""}`}
              onClick={() => updateState("selectedBoard", d.Id)}
            >
              {d.Title}
            </p>
          ))}
        </div> */}

        {selectedBoard && (
          <DynamicGame
            key={selectedBoard}
            setDragging={(which: any) => updateState("dragging", which)}
            board={boards.find((b) => b.Id === selectedBoard)}
          />
        )}
      </div>
    </div>
  );
}
