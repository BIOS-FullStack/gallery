// sum.js
export function sum(a, b) {
	return a + b;
}

// " Hola MunDo    " -> "Hola mundo"
export function cleanText(text, capitalize = true) {
	let textCleaned = text?.trim().toLowerCase();

	if (capitalize) {
		textCleaned =
			textCleaned.slice(0, 1).toUpperCase() + textCleaned.slice(1);
	}

	return textCleaned;
}
