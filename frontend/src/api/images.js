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
