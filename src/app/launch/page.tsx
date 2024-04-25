"use client";
import Game from "@/utils/config/game";
import boards from "@/utils/config/data.json";
import { useState } from "react";
//import dynamic from "next/dynamic";

//const DynamicGame = dynamic(() => import("@/utils/config/game"), {
  //ssr: false,
//});

export default function GameLaunch() {
  const [states, setStates] = useState({
    selectedBoard: "285",
    dragging: false,
  });

  const { selectedBoard, dragging } = states;
  
  const updateState = (key: string, value: string) => {
    setStates({ ...states, [key]: value });
  }

  return (
    <div>
      <h1>Game Launch</h1>
      <div className={`App ${dragging ? "dragging" : ""}`}>
        <div className="boards">
          {boards.map(d => (
            <p
              key={`board-${d.Id}`}
              className={`${selectedBoard === d.Id ? "selected" : ""}`}
              onClick={() => updateState("selectedBoard", d.Id)}
            >
              {d.Title}
            </p>
          ))}
        </div>

        {selectedBoard && (
          <Game
            key={selectedBoard}
            setDragging={(which: any) => updateState("selectedBoard", which)}
            board={boards.find(b => b.Id === selectedBoard)}
          />
        )}
      </div>
    </div>
  );
}