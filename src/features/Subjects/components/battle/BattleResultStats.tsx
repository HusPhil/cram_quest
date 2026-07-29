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
	return (
		<div className="w-full flex justify-between md:gap-3 ">
			<div className="flex gap-3 flex-col justify-center items-center md:mx-3 border-success rounded-md">
				<div className="flex justify-center items-center gap-1 text-center">
					<TbBolt color={iconColor} />
					<p className={`text-xs md:text-sm ${textColor}`}>
						Total XP
					</p>
				</div>
				<p className="text-center">{base_xp + bonus_xp}</p>
			</div>
			<div className="flex flex-1 flex-col justify-center mx-3 items-center space-y-2 bg-success/5 p-3 rounded-md">
				<p className="text-xs md:text-sm text-center">
					EXPERIENCE GAINED
				</p>
				<div className="space-y-3 flex flex-col justify-center items-center">
					<div className="flex items-center gap-1 md:gap-3">
						<p
							className={`text-3xl md:text-4xl font-bold ${textColor}`}
						>
							+{base_xp}
						</p>
						<p className="text-xl md:text-2xl text-accent animate-pulse">
							+{bonus_xp}
						</p>
					</div>
				</div>
			</div>
			<div className="flex gap-3 flex-col justify-center items-center md:mx-3 border-success rounded-md">
				<div className="flex justify-center items-center gap-1 text-center">
					<TbFlame color={iconColor} />
					<p className={`text-xs md:text-sm ${textColor}`}>Streak</p>
				</div>
				{result === 'victory' ? (
					<p className="text-success text-center">{`${streak_count} ${
						streak_count > 1 ? 'wins' : 'win'
					}`}</p>
				) : (
					<p className="text-sm text-danger">RESET</p>
				)}
			</div>
		</div>
	);
}
