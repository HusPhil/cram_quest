export const accuracyCalculator = (
	finalPosition: number,
	targetPosition: number = 50
) => {
	const maxPossibleDeviation = targetPosition;
	// 1. Calculate the actual deviation (absolute distance from the center)
	const actualDeviation = Math.abs(finalPosition - targetPosition);

	// 2. Handle perfect hit case to immediately return 100%
	if (Math.floor(actualDeviation) === 0) {
		return 100;
	}

	// 3. Handle cases where the deviation is at or beyond the maximum (e.g., if input validation fails
	//    and sliderPosition is somehow < 0 or > 100, or simply hitting 0 or 100)
	if (actualDeviation >= maxPossibleDeviation) {
		return 0;
	}

	// 4. Calculate the accuracy percentage
	//    The ratio `actualDeviation / maxPossibleDeviation` gives us a normalized error between 0 and 1.
	//    Subtracting this from 1 inverts it (so 0 error becomes 1, and max error becomes 0).
	//    Multiplying by 100 converts it to a percentage.
	const accuracy = (1 - actualDeviation / maxPossibleDeviation) * 100;

	// 5. Round to a reasonable number of decimal places for display
	return parseFloat(accuracy.toFixed(2));
};
