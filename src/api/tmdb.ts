import axios from 'axios';

export const tmdb = axios.create({
    baseURL: import.meta.env.VITE_TMDB_API_URL,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
    headers: {
        accept: 'application/json',
    },
});
