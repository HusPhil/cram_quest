export function limitChars(text: string, limit: number = 50): string {
	if (!text) return '';
	return text.length > limit ? text.slice(0, limit) + '…' : text;
}
