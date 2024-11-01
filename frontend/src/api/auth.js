import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { getFirebaseAuthError } from '../constants/errors';

const auth = getAuth();

export const createUserAccount = async ({ data }) => {
	try {
		let { email, password } = data;

		email = email?.toLowerCase().trim().replaceAll(' ', '');

		await createUserWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.log(error.code);
		const message = getFirebaseAuthError(error.code);
		throw new Error(message);
	}
};

export const signInUser = async ({ data }) => {
	try {
		let { email, password } = data;
		email = email?.toLowerCase().trim().replaceAll(' ', '');
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.log(error.code);
		const message = getFirebaseAuthError(error.code);
		throw new Error(message);
	}
};

export const signOutUser = async () => {
	await signOut(auth);
};
