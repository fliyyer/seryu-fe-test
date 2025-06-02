import { tmdb } from "./tmdb";

const defaultParams = {
    language: 'en-US',
};

export const getNowPlaying = async (page = 1) => {
    const { data } = await tmdb.get('/movie/now_playing', {
        params: { ...defaultParams, page },
    });
    return data;
};

export const getTopRated = async (page = 1) => {
    const { data } = await tmdb.get('/movie/top_rated', {
        params: { ...defaultParams, page },
    });
    return data;
}

export const getMovieDetail = async (id: string) => {
    const { data } = await tmdb.get(`/movie/${id}`, {
        params: defaultParams,
    });
    return data;
};

export const getRecommendations = async (id: string) => {
    const { data } = await tmdb.get(`/movie/${id}/recommendations`, {
        params: defaultParams,
    });
    return data.results;
};

export const searchMovies = async (query: string) => {
    const { data } = await tmdb.get('/search/movie', {
        params: {
            ...defaultParams,
            query,
            include_adult: false,
        },
    });
    return data.results;
};