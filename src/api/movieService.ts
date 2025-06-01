import { tmdb } from "./tmdb";

export const getNowPlaying = async (page = 1) => {
    const response = await tmdb.get('/movie/now_playing', {
        params: {
            language: 'en-US',
            page: page,
        }
    });
    return response.data;
}

export const getTopRated = async (page = 1) => {
    const response = await tmdb.get('/movie/top_rated', {
        params: {
            language: 'en-US',
            page: page,
        }
    });
    return response.data;
}

export const getMovieDetail = async (id: string) => {
    const response = await tmdb.get(`/movie/${id}`, {
        params: {
            language: 'en-US',
        }
    })
    return response.data;
}

export const getRecommendations = async (id: string) => {
    const res = await tmdb.get(`/movie/${id}/recommendations`, {
        params: { language: 'en-US' },
    });
    return res.data.results;
};

export const searchMovies = async (query: string) => {
    const response = await tmdb.get('/search/movie', {
        params: {
            query: query,
            language: 'en-US',
            include_adult: false,
        }
    });
    return response.data.results;
}