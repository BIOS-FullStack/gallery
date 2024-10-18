import { initializeApp } from 'firebase/app';
import { getVertexAI, getGenerativeModel } from 'firebase/vertexai-preview';

import { FIREBASE_CONFIG } from '../constants/config';

const app = initializeApp(FIREBASE_CONFIG);
const vertexAI = getVertexAI(app);

export const AI = getGenerativeModel(vertexAI, { model: 'gemini-1.5-flash' });
