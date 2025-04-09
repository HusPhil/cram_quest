import React from "react";
import { ProgressBar } from "../../../../CheckIn/components/PlayerCard/ProgressBar";
import TagLabel from "../../../../../components/TagLabel";



export default function QuestListHeader() {
  return (
    <div
      className="h-full space-y-3 flex flex-col justify-center 
                  bg-secondary/40 border-accent/80 border p-3 rounded-lg"
    >
      <div className="flex my-2 justify-around items-center h-full gap-5">
        <div className="flex flex-col justify-center items-center shrink-0 ml-2">
          <h1 className="text-5xl">3</h1>
          <p className="text-sm text-center text-accent">
            Conquered
            <br />
            Today
          </p>
        </div>
        <div className="border-l border-text/50 h-full"></div>
        <div className="flex-1 border-text/30 h-full flex flex-col justify-center">
          <h1 className="text-xl font-bold">Hi, <span className="text-accent">CacheWarrior!</span></h1>
          <p className="text-sm text-text/50">Conquer your quests!</p>
        </div>
      </div>
      <div className="space-y-2">
        <span className="flex items-center justify-between text-xs ">
          <TagLabel info={`Streak: 12`} className="px-3 py-0.5 rounded-lg" />
          <p>{`Completed: ${2}/${3}`}</p>
        </span>
        <ProgressBar value={2} max={3} />
      </div>
    </div>
  );
}

