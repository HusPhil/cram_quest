import React, { useState } from 'react';
import SpriteSheet from '../../../../components/SpriteSheet';
import { BattleSessionEnd } from '../../../../services/api/schema/battle_session_schema';
import BattleResultStats from './BattleResultStats.tsx';
import BattleResultButton from './BattleResultButton.tsx';
import colors from '../../../../data/colors.ts';
import { TbSwords } from 'react-icons/tb';
import { getRandomChoice } from '../../../../utils/getRandomChoice.ts';
import { BossBattleEndRead } from '../../../../services/api/schema/boss_battle_status_schema.ts';
import BossBattleResultStats from './BossBattleResultStats.tsx';
import ItemRewardDisplay from '../../../../components/ItemRewardDisplay.tsx';

interface SpriteProps {
	characterAsset: string;
	frameCount: number;
	fps: number;
	row: number;
}

interface BattleResultDisplayProps {
	result: 'victory' | 'defeat';
	sprite: SpriteProps;
	battleCleanup: () => void;
	battleSessionResult?: BattleSessionEnd | BossBattleEndRead;
	bossBattle?: boolean;
}

const epicBossMessages = [
	'A great presence senses your defiance…',
	'The shadows stir… something ancient awakens.',
	'A dreadful force emerges from the depths',
	'The boss stirs — its gaze now fixed upon you…',
	'A dark omen fills the air… boss is awake.',
	'The silence breaks… your nemesis approaches.',
	'A fearsome entity answers your call.',
	'The seal cracks open… your battle awaits.',
	'You stand before the awakened terror.',
	'Your final test draws near…',
];

const BattleResultDisplay: React.FC<BattleResultDisplayProps> = ({
	result,
	sprite,
	battleCleanup,
	bossBattle,
	battleSessionResult,
}) => {
	// Pick icon & colors based on result
	const isVictory = result === 'victory';
	const Icon = TbSwords;
	const color = isVictory ? colors.success : colors.danger; // Tailwind's green-500 or red-500
	const borderColor = isVictory ? 'border-success' : 'border-danger';
	const bgColor = isVictory ? 'bg-success/15' : 'bg-danger/15';
	const textColor = isVictory ? 'text-success' : 'text-danger';

	const rewardItem = (battleSessionResult as BossBattleEndRead)?.reward_item;

	const [isViewingReward, setIsViewingReward] = useState(false);

	return (
		<div className="w-full flex flex-col items-center">
			<div
				className={`w-full border rounded-md p-2 px-5 flex items-center justify-between ${borderColor} ${bgColor}`}
			>
				<Icon className="w-6 h-6 shrink-0" color={color} />
				<p className={`text-xl font-bold ${textColor}`}>
					{result.toUpperCase()}
				</p>
				<Icon className="w-6 h-6 shrink-0" color={color} />
			</div>

			{!isViewingReward && (
				<SpriteSheet
					src={sprite.characterAsset}
					frameHeight={48}
					frameWidth={48}
					frameCount={sprite.frameCount}
					fps={sprite.fps}
					frameRow={sprite.row}
					scale={2.5}
					loop
				/>
			)}

			{bossBattle && battleSessionResult ? (
				<div className="mt-5 w-full flex flex-col items-center">
					{isViewingReward && rewardItem ? (
						<ItemRewardDisplay rewardItem={rewardItem} />
					) : (
						<BossBattleResultStats
							result={result}
							base_xp={battleSessionResult.base_xp}
							bonus_xp={battleSessionResult.bonus_xp}
						/>
					)}
					<div className="flex w-full gap-5">
						<BattleResultButton
							result={result}
							onClick={battleCleanup}
						/>{' '}
						{rewardItem && (
							<BattleResultButton
								title="View Reward"
								className="animate-pulse"
								result={result}
								onClick={() =>
									setIsViewingReward((prev) => !prev)
								}
							/>
						)}
					</div>
				</div>
			) : battleSessionResult ? (
				<>
					<BattleResultStats
						result={result}
						base_xp={battleSessionResult.base_xp}
						bonus_xp={battleSessionResult.bonus_xp}
						streak_count={
							(battleSessionResult as BattleSessionEnd)
								.session_streak
						}
					/>
					{(battleSessionResult as BattleSessionEnd)
						.is_boss_available && (
						<p className="mt-5 p-1 px-5 text-center text-sm rounded-md text-danger animate-pulse bg-danger/10">
							{getRandomChoice(epicBossMessages, '', true)}
						</p>
					)}
					<BattleResultButton
						result={result}
						onClick={battleCleanup}
					/>
				</>
			) : (
				<>
					<p className="mt-3 opacity-50 text-white">
						Calculating results..
					</p>
				</>
			)}
		</div>
	);
};

export default BattleResultDisplay;
