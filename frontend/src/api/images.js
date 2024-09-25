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
			const response = await axios.post(BASE_URL, {
				...data,
				file: reader.result,
				filename: data?.file?.name,
			});

			resolve(response.data);
		};
	});
};
