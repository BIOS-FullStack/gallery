const calculateLevenshteinDistance = require('../helpers/strings');

const images = [
	{
		id: 1,
		url: 'http://localhost:3000/images/close-up-portrait-yorkshire-dogs.jpg',
		alt: 'Close-up portrait of Yorkshire dogs',
		searchTerms: [
			'close-up',
			'portrait',
			'Yorkshire',
			'dogs',
			'animals',
			'pets',
			'cute',
			'adorable',
		],
	},
	{
		id: 2,
		url: 'http://localhost:3000/images/closeup-vertical-shot-cute-european-shorthair-cat.jpg',
		alt: 'Close-up vertical shot of a cute European Shorthair cat',
		searchTerms: [
			'close-up',
			'vertical',
			'shot',
			'cute',
			'European',
			'Shorthair',
			'cat',
			'animals',
			'pets',
		],
	},
	{
		id: 3,
		url: 'http://localhost:3000/images/cute-cats-relaxing-indoors.jpg',
		alt: 'Cute cats relaxing indoors',
		searchTerms: ['cute', 'cats', 'relaxing', 'indoors', 'animals', 'pets'],
	},
	{
		id: 4,
		url: 'http://localhost:3000/images/cute-cats.jpg',
		alt: 'Cute cats',
		searchTerms: ['cute', 'cats', 'animals', 'pets'],
	},
	{
		id: 5,
		url: 'http://localhost:3000/images/cute-dogs-standing.jpg',
		alt: 'Cute dogs standing',
		searchTerms: ['cute', 'dogs', 'standing', 'animals', 'pets'],
	},
	{
		id: 6,
		url: 'http://localhost:3000/images/dogs-2.jpg',
		alt: 'Cute dogs',
		searchTerms: ['cute', 'dogs', 'animals', 'pets'],
	},
	{
		id: 7,
		url: 'http://localhost:3000/images/dogs.jpg',
		alt: 'Cute kitten',
		searchTerms: ['cute', 'kitten', 'animals', 'pets'],
	},
];

class ImagesModel {
	async getAll(params) {
		console.log(calculateLevenshteinDistance('katte', 'kitten'));
		const { search } = params;

		const results = images.sort((a, b) => {
			const termsA = a.searchTerms;
			const termsB = b.searchTerms;

			termsA.sort((termA, termB) => {
				return (
					calculateLevenshteinDistance(search, termA) -
					calculateLevenshteinDistance(search, termB)
				);
			});
			termsB.sort((termA, termB) => {
				return (
					calculateLevenshteinDistance(search, termA) -
					calculateLevenshteinDistance(search, termB)
				);
			});

			console.log(termsA, termsB);

			const distanceA = calculateLevenshteinDistance(search, termsA[0]);
			const distanceB = calculateLevenshteinDistance(search, termsB[0]);

			console.log(distanceA, distanceB);

			return distanceA - distanceB;
		});

		console.log(results);

		const body = results
			.map((result) => {
				return {
					id: result.id,
					url: result.url,
					alt: result.alt,
				};
			})
			.slice(0, 2);

		return body;
	}
}

module.exports = ImagesModel;
