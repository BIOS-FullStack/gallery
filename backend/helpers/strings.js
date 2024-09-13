function calculateLevenshteinDistance(sourceString = '', targetString = '') {
	const dpMatrix = Array.from({ length: sourceString.length + 1 }, () =>
		Array(targetString.length + 1),
	);

	for (let i = 0; i <= sourceString.length; i++) {
		for (let j = 0; j <= targetString.length; j++) {
			if (i === 0) {
				dpMatrix[i][j] = j;
			} else if (j === 0) {
				dpMatrix[i][j] = i;
			} else {
				const substitutionCost =
					sourceString[i - 1] === targetString[j - 1] ? 0 : 1;
				dpMatrix[i][j] = Math.min(
					dpMatrix[i - 1][j] + 1, // Deletion
					dpMatrix[i][j - 1] + 1, // Insertion
					dpMatrix[i - 1][j - 1] + substitutionCost, // Substitution
				);
			}
		}
	}
	return dpMatrix[sourceString.length][targetString.length];
}

module.exports = calculateLevenshteinDistance;
