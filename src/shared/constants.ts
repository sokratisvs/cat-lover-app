export const API_BASE_URL = 'https://api.thecatapi.com/v1';
export const API_KEY = import.meta.env.VITE_CAT_API_KEY;

export const defaultHeaders = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

export const RESULTS_PER_PAGE = 10;
