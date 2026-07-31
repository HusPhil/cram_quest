import colors from '../../../../data/colors';
import { TbSkull } from 'react-icons/tb';

export default function BossStatusLoader() {
	return (
		<div className="w-full flex flex-col items-center gap-4">
			<div className="flex items-center space-x-2">
				<TbSkull className="w-5 h-5 shrink-0" color={colors.accent} />
				<p className="text-accent font-bold uppercase animate-pulse">
					Awakening the boss…
				</p>
				<TbSkull className="w-5 h-5 shrink-0" color={colors.accent} />
			</div>

			<div className="flex space-x-2 mb-2">
				{[1, 2, 3].map((slotNum) => (
					<div
						key={slotNum}
						className="w-10 h-10 border-2 border-accent/40 bg-accent/15 rounded-full animate-pulse"
					/>
				))}
			</div>

			<div className="flex items-center space-x-3 pt-4 border-t border-gray-600 w-full justify-center">
				<p className="text-gray-300">Boss Status:</p>
				<span className="font-bold text-accent/70 animate-pulse">
					CHECKING…
				</span>
			</div>

			<div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
				<div className="h-full bg-accent/70 animate-pulse" />
			</div>
		</div>
	);
}
