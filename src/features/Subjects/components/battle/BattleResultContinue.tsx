import { TbStar } from 'react-icons/tb';
import colors from '../../../../data/colors';

export default function BattleResultContinue({
	result,
	battleCleanUp,
}: {
	result: 'victory' | 'defeat' | null;
	battleCleanUp: () => void;
}) {
	const textColor = result === 'victory' ? 'text-success' : 'text-danger';
	const iconColor = result === 'victory' ? colors.success : colors.danger;
	const borderBgStyle =
		result === 'victory'
			? 'bg-success/15 border-success'
			: 'bg-danger/15 border-danger';

	return (
		<button
			className={`w-full mt-5 inline-flex justify-center items-center gap-3  border-none outline-none`}
			onClick={battleCleanUp}
		>
			<div
				className={`w-full py-2 px-5 border transition-transform rounded-md active:scale-95 ${borderBgStyle}`}
			>
				<p className={`${textColor}`}>CONTINUE</p>
			</div>
		</button>
	);
}
