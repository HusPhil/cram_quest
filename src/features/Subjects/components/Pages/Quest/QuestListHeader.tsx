import React from 'react';
import { ProgressBar } from '../../../../CheckIn/components/PlayerCard/ProgressBar';
import TagLabel from '../../../../../components/TagLabel';
import { FaPlus } from 'react-icons/fa';
import { Quest } from './QuestsPage';

export default function QuestListHeader({ quests }: { quests: Quest[] }) {
	return (
		<div className="flex items-center justify-between my-1">
			<span className="flex gap-2">
				<h1 className="text-md font-bold">Quests</h1>
				<TagLabel className="flex items-center rounded-full px-2">
					<p className="text-xs">All: {quests.length.toString()}</p>
				</TagLabel>
				<TagLabel className="flex items-center rounded-full px-2">
					<p className="text-xs">Doing: 5</p>
				</TagLabel>
				<TagLabel className="flex items-center rounded-full px-2">
					<p className="text-xs">Done: 5</p>
				</TagLabel>
			</span>
			<span className="flex text-sm items-center bg-accent text-white  py-1 rounded-md px-3">
				<button className="flex items-center gap-1 text-xs">
					Add <FaPlus className="w-3 h-3" />
				</button>
			</span>
		</div>
	);
}

// <div
//   className="h-full space-y-3 flex flex-col justify-center
//               bg-secondary/40 border-accent/80 border p-3 rounded-lg"
// >
//   <div className="flex my-2 justify-around items-center h-full gap-5">
//     <div className="flex flex-col justify-center items-center shrink-0 ml-2">
//       <h1 className="text-5xl">3</h1>
//       <p className="text-sm text-center text-accent">
//         Conquered
//         <br />
//         Today
//       </p>
//     </div>
//     <div className="border-l border-text/50 h-full"></div>
//     <div className="flex-1 border-text/30 h-full flex flex-col justify-center">
//       <h1 className="text-xl font-bold">Hi, <span className="text-accent">CacheWarrior!</span></h1>
//       <p className="text-sm text-text/50">Conquer your quests!</p>
//     </div>
//   </div>
//   <div className="space-y-2">
//     <span className="flex items-center justify-between text-xs ">
//       <TagLabel info={`Streak: 12`} className="px-3 py-0.5 rounded-lg" />
//       <p>{`Completed: ${2}/${3}`}</p>
//     </span>
//     <ProgressBar value={2} max={3} />
//   </div>
// </div>
