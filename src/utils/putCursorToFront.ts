export const putCursorToFront = (element: HTMLElement) => {
	const length = element.textContent?.length ?? 0;
	const range = document.createRange();
	const selection = window.getSelection();

	range.setStart(element.firstChild || element, length);

	range.collapse(true);
	selection?.removeAllRanges();
	selection?.addRange(range);
};
