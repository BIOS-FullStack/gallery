import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { FIREBASE_CONFIG } from '../constants/config';

// Initialize Firebase
export const app = initializeApp(FIREBASE_CONFIG);
export const db = getFirestore(app);
