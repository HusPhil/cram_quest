import { memo, useEffect, useRef, useState } from 'react';
import { useBattleSetupStore } from '../../../../Battle/stores/battleSetupStore';

interface BattleTimerProps {
	duration?: number; // in seconds (debug)
	onTimeUp?: () => void;
}

export const BattleTimer = ({ duration = 60, onTimeUp }: BattleTimerProps) => {
	const [timeLeft, setTimeLeft] = useState(duration * 60);
	const setBattleResult = useBattleSetupStore(
		(state) => state.setBattleResult
	);

	const startTimeRef = useRef<number | null>(null);

	useEffect(() => {
		startTimeRef.current = Date.now();

		const tick = () => {
			if (!startTimeRef.current) return;

			const elapsed = Math.floor(
				(Date.now() - startTimeRef.current) / 1000
			);
			const remaining = Math.max(duration * 60 - elapsed, 0);

			setTimeLeft(remaining);

			if (remaining === 0) {
				onTimeUp?.();
				alert('timer ended');
				setBattleResult('defeat');
				clearInterval(timer);
			}
		};

		const timer = setInterval(tick, 1000);

		return () => clearInterval(timer);
	}, [duration, onTimeUp, setBattleResult]);

	return (
		<div className="flex items-center justify-center p-2 rounded-lg">
			<span
				className={`text-xl font-bold ${
					timeLeft <= 10 ? 'text-danger' : 'text-accent'
				}`}
			>
				{Math.floor(timeLeft / 60)}:
				{(timeLeft % 60).toString().padStart(2, '0')}
			</span>
		</div>
	);
};

export default memo(BattleTimer);
