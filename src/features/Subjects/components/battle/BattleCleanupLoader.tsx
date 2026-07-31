import colors from '../../../../data/colors';
import { TbSwords } from 'react-icons/tb';

export default function BattleCleanupLoader() {
	return (
		<div className="w-full flex flex-col items-center gap-4 mt-4">
			<div className="w-full border border-accent rounded-md p-2 px-5 flex items-center justify-between bg-accent/15">
				<TbSwords className="w-6 h-6 shrink-0" color={colors.accent} />
				<p className="text-accent font-bold uppercase animate-pulse">
					Cleaning up the battlefield…
				</p>
				<TbSwords className="w-6 h-6 shrink-0" color={colors.accent} />
			</div>

			<div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
				<div className="h-full bg-accent/70 animate-pulse" />
			</div>
		</div>
	);
}
