const { OpenAI } = require('openai');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	project: process.env.OPENAI_PROJECT_ID,
});

class AIAssistance {
	constructor() {}

	getTags(filename) {
		return new Promise((resolve) => {
			openai.completions
				.create({
					model: process.env.OPENAI_MODEL_ID,
					prompt: `The image is of a ${filename}. The tags are: `,
					max_tokens: 100,
				})
				.then((response) => {
					resolve(['tag1', 'tag2', 'tag3']);
					console.log(response);
				});
		});
	}
}

module.exports = AIAssistance;
