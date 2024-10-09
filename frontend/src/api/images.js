import axios from 'axios';
import { API_URL } from '../constants/config';

const BASE_URL = `${API_URL}/images`;

export const getImages = async ({ query } = {}) => {
	const url = new URL(BASE_URL);
	if (query) {
		url.searchParams.append('search', query);
	}

	const response = await axios.get(url.toString());

	return response.data;
};

export const setImage = async ({ data }) => {
	return new Promise((resolve) => {
		const reader = new FileReader();

		reader.readAsDataURL(data.file);

		reader.onload = async () => {
			const formData = new FormData();

			formData.append('fileName', data.file.name);

			// const obj = { type: 'image/jpeg', base64: '...' } => Object.keys(obj) => ['type', 'base64']

			Object.keys(data).forEach((key) => {
				formData.append(key, data[key]);
			});

			const response = await axios.post(BASE_URL, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			resolve(response.data);
		};
	});
};
