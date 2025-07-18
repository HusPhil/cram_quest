import React from 'react';
import { TbStar } from 'react-icons/tb';
import colors from '../../../../data/colors';

export default function BattleResultContinue({
	battleCleanUp,
}: {
	battleCleanUp: () => void;
}) {
	return (
		<button
			className="mt-7 inline-flex justify-center items-center gap-3 bg-success/15 border-success py-2 px-5 rounded-md border transition-transform active:scale-90 hover:scale-90"
			onClick={battleCleanUp}
		>
			<TbStar color={colors.success} />
			<p className="font-bold text-success">CONTINUE</p>
			<TbStar color={colors.success} />
		</button>
	);
}
