const ENV = import.meta.env || window.process.env || {};

export const API_URL = ENV.VITE_API_URL || '';
export const FIREBASE_CONFIG = JSON.parse(ENV.VITE_FIREBASE_CONFIG || '{}');
