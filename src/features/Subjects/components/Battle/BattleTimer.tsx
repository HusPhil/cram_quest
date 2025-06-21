import { memo, useEffect, useState } from 'react';

interface BattleTimerProps {
	duration?: number; // in minutes
	onTimeUp?: () => void;
}

export const BattleTimer = ({ duration = 60, onTimeUp }: BattleTimerProps) => {
	const [timeLeft, setTimeLeft] = useState(duration * 60);

	useEffect(() => {
		if (timeLeft <= 0) {
			onTimeUp?.();
			alert('timer ended');
			return;
		}

		const timer = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [timeLeft, onTimeUp]);

	return (
		<div className="flex items-center justify-center p-2 rounded-lg">
			<span className="text-xl font-bold text-accent">
				{Math.floor(timeLeft / 60)}:
				{(timeLeft % 60).toString().padStart(2, '0')}
			</span>
		</div>
	);
};

export default memo(BattleTimer);
