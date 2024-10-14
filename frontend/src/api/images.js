import axios from 'axios';
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
	console.log(data);
	const formData = new FormData();
	const imageResponse = await fetch(`${CORS_PROXY}${data?.image.url}`);
	const imageFile = await imageResponse.blob();

	formData.append('file', imageFile);
	formData.append('alt', data?.alt);
	formData.append('searchTerms', data?.searchTerms);
	formData.append(
		'filename',
		`${Date.now()}-${Math.random().toString(36).substring(7)}.png`,
	);

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
