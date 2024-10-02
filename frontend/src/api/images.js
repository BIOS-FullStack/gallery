import axios from 'axios';
import { API_URL } from '../constants/config';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const BASE_URL = `${API_URL}/images`;

export const getImages = async ({ query } = {}) => {
	const url = new URL(BASE_URL);
	if (query) {
		url.searchParams.append('search', query);
	}

	const response = await axios.get(url.toString());

	return response.data;
};

export const setImage = async ({ data, id = '0I4EIz7jYBRKzTdAY4cD' }) => {
	return new Promise((resolve) => {
		const reader = new FileReader();

		reader.readAsDataURL(data.file);

		reader.onload = async () => {
			const docId = id || Date.now().toString();
			const collectionRef = doc(db, 'images', docId);
			const docRef = await getDoc(collectionRef);

			console.log('Document written with ID: ', docRef.data());
			resolve(docRef);
		};
	});
};
