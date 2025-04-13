type KnockbackOptions = {
	fromX: number;
	setX: (value: number) => void;
	onDone: () => void;
	direction: 'left' | 'right';
	knockbackDmg?: number; // how far it gets pushed
	duration?: number;
};

const startKnockback = ({
	fromX,
	setX,
	onDone,
	direction,
	knockbackDmg = 10,
	duration = 300,
}: KnockbackOptions): (() => void) => {
	const toX =
		direction === 'left'
			? fromX - knockbackDmg
			: fromX + knockbackDmg;

	const start = performance.now();
	let frameId: number;

	const easeOutQuad = (t: number) => t * (2 - t);

	const animate = (now: number) => {
		const elapsed = now - start;
		const progress = Math.min(elapsed / duration, 1);
		const eased = easeOutQuad(progress);

		const newPos = fromX - (toX - fromX) * eased;
		setX(newPos);

		if (progress < 1) {
			frameId = requestAnimationFrame(animate);
		} else {
			onDone();
		}
	};

	frameId = requestAnimationFrame(animate);

	return () => cancelAnimationFrame(frameId); // cancel on cleanup
};

export default startKnockback;