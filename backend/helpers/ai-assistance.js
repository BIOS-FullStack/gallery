const { OpenAI } = require('openai');
const fs = require('fs');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	project: process.env.OPENAI_PROJECT_ID,
});

const processJSON = async (jsonString) => {
	try {
		const res = JSON.parse(jsonString);
		return res;
	} catch (error) {
		return {};
	}
};

class AIAssistance {
	constructor() {}

	getImageGeneration(alt) {
		return new Promise(async (resolve) => {
			const response = await openai.chat.completions.create({
				model: 'gpt-4o-mini',
				temperature: 0.1,
				messages: [
					{
						role: 'system',
						content: `Actua como un generador de tags y propms para un generador de imagenes,
						te voy a dar un texto, vas a generar tags (Genera minimo 10 tags) para una imagen basado en ese texto,
						y vas a darme una descripcion de la imagen que se genero, en forma de propm para dall-e-3,
						para que genere imagenes para una galeria de imagenes publica donde las personas puedan descargarlas
						y usarlas en sus proyectos,
						el formato de respuesta tiene que ser así, no cambies el formato por nada del mundo:

						{"tags": ["tag1", "tag2", "tag3"],"prompt": "texto"}

						`,
					},
					{
						role: 'user',
						content: `Este es el alt de la imagen: ${alt}?`,
					},
				],
			});

			const { prompt = 'Genera una imagen aleatorea', tags = [] } =
				await processJSON(response.choices[0].message.content);

			const { data } = await openai.images.generate({
				model: 'dall-e-3',
				size: '1024x1024',
				prompt,
				n: 1,
				response_format: 'url',
				style: 'natural',
			});

			resolve({ tags, image: data[0] });
		});
	}
}

module.exports = AIAssistance;
