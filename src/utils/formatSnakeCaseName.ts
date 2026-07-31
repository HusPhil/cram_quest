export const formatSnakeCaseName = (name: string) =>
	name.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
