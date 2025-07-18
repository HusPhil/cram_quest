import { TbBolt, TbFlame } from 'react-icons/tb';
import colors from '../../../../data/colors';

export default function BattleResultStats({
	bonus_xp,
	base_xp,
	streak_count,
}: {
	bonus_xp: number;
	base_xp: number;
	streak_count: number;
}) {
	return (
		<div className="w-full flex justify-between gap-3 mt-5">
			<div className="flex flex-col flex-1  justify-center items-center p-2 bg-secondary border-success rounded-md">
				<div className="flex justify-center items-center gap-1">
					<TbBolt color={colors.success} />
					<p className="text-sm text-success">Total XP</p>
				</div>
				<p className="">{base_xp + bonus_xp}</p>
			</div>
			<div className="flex flex-col flex-1  justify-center items-center p-2 gap-1 bg-secondary border-success rounded-md">
				<div className="flex justify-center items-center gap-1">
					<TbFlame color={colors.success} />
					<p className="text-sm text-success">Streak</p>
				</div>
				<p className="">{streak_count} days</p>
			</div>
		</div>
	);
}
