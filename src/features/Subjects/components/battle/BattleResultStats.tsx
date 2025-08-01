import { TbBolt, TbFlame } from 'react-icons/tb';
import colors from '../../../../data/colors';

export default function BattleResultStats({
	result,
	bonus_xp,
	base_xp,
	streak_count,
}: {
	result: 'victory' | 'defeat' | null;
	bonus_xp: number;
	base_xp: number;
	streak_count: number;
}) {
	const textColor = result === 'victory' ? 'text-success' : 'text-danger';
	const iconColor = result === 'victory' ? colors.success : colors.danger;
	// TODO: fix the display to show the correct values

	return (
		<div className="w-full flex justify-between gap-3">
			<div className="flex flex-col justify-center items-center p-2  mx-3  border-success rounded-md">
				<div className="flex justify-center items-center gap-1">
					<TbBolt color={iconColor} />
					<p className={`text-sm ${textColor}`}>Total XP</p>
				</div>
				<p className="">{base_xp + bonus_xp}</p>
			</div>
			<div className="flex flex-1 flex-col justify-center items-center space-y-1 bg-success/5 p-3 rounded-md">
				<p className="text-sm">EXPERIENCE GAINED</p>
				<div className="space-y-3 flex flex-col justify-center items-center">
					<div className="flex items-center gap-3">
						<p className={`text-4xl font-bold ${textColor}`}>
							+{16}
						</p>
						<p className="text-2xl text-accent animate-pulse">
							+{17}
						</p>
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center p-2 gap-1  mx-3 border-success rounded-md">
				<div className="flex justify-center items-center gap-1">
					<TbFlame color={iconColor} />
					<p className={`text-sm ${textColor}`}>Streak</p>
				</div>
				{result === 'victory' ? (
					<p className="text-success">{`${streak_count} ${
						streak_count > 1 ? 'wins' : 'win'
					}`}</p>
				) : (
					<p className="text-sm text-danger">RESET</p>
				)}
			</div>
		</div>
	);
}
