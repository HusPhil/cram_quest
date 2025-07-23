export function timeAgo(isoString: string): string {
	const date = new Date(isoString);
	const today = new Date();

	// Strip time for fair date diff
	const dateOnly = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate()
	);
	const todayOnly = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate()
	);

	const diffTime = todayOnly.getTime() - dateOnly.getTime();
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 0) {
		return 'In the future';
	} else if (diffDays === 0) {
		return 'Today';
	} else if (diffDays === 1) {
		return 'Yesterday';
	} else if (diffDays < 7) {
		return `${diffDays} days ago`;
	} else if (diffDays < 30) {
		const weeks = Math.floor(diffDays / 7);
		return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
	} else if (diffDays < 365) {
		const months = Math.floor(diffDays / 30);
		return months === 1 ? '1 month ago' : `${months} months ago`;
	} else {
		const years = Math.floor(diffDays / 365);
		return years === 1 ? '1 year ago' : `${years} years ago`;
	}
}
