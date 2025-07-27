export function getRandomChoice<T>(
	choices: T[],
	currentChoice: T,
	excludeCurrent: boolean = true
): T {
	const pool = excludeCurrent
		? choices.filter((choice) => choice !== currentChoice)
		: choices;

	if (pool.length === 0) return currentChoice;

	const randomIndex = Math.floor(Math.random() * pool.length);
	return pool[randomIndex];
}
