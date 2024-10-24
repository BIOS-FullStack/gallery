import axios from 'axios';

import { AI } from './firebase';

import { API_URL } from '../constants/config';

const BASE_URL = `${API_URL}/images`;
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export const getImages = async ({ query } = {}) => {
	const url = new URL(BASE_URL);
	if (query) {
		url.searchParams.append('search', query);
	}

	const response = await axios.get(url.toString());

	return response.data;
};

export const saveImage = async ({ data }) => {
	const formData = new FormData();
	let imageFile = data?.file;

	if (!imageFile) {
		const imageResponse = await fetch(`${CORS_PROXY}${data?.image.url}`);
		imageFile = await imageResponse.blob();
	}

	console.log(data?.file);

	const defaultFileName = `${Date.now()}-${Math.random()
		.toString(36)
		.substring(7)}.png`;

	formData.append('file', imageFile);
	formData.append('alt', data?.alt);
	formData.append('searchTerms', data?.searchTerms);
	formData.append('filename', data?.file?.name || defaultFileName);

	const response = await axios.post(BASE_URL, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

	return response.data;
};

export const generateImage = async ({ alt }) => {
	const url = new URL(`${BASE_URL}/generate`);
	url.searchParams.append('alt', alt);

	const response = await axios.get(url.toString());

	return response.data;
};

export const generateSearchTerms = async ({ file }) => {
	const prompt = `Genera etiquetas para esta imagen, 
	que sirvan como términos de búsqueda, y devuelvelas
	en un formato único igual a este:

	cielo, estrellas, nubes, cielo abierto, paisaje
	
	`;

	const imagePart = await fileToGenerativePart(file);

	const result = await AI.generateContent([prompt, imagePart]);

	const response = result.response;
	const text = response.text();

	return text;
};

async function fileToGenerativePart(file) {
	const base64EncodedDataPromise = new Promise((resolve) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result.split(',')[1]);
		reader.readAsDataURL(file);
	});

	return {
		inlineData: {
			data: await base64EncodedDataPromise,
			mimeType: file.type,
		},
	};
}
