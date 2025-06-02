import { tmdb } from "./tmdb";

export const markAsFavorite = async (sessionId: string, mediaId: number, favorite: boolean) => {
    const response = await tmdb.post(`/account/{account_id}/favorite`, {
        media_type: "movie",
        media_id: mediaId,
        favorite,
    }, {
        params: { session_id: sessionId },
    });
    return response.data;
}

export const addToWatchlist = async (sessionId: string, mediaId: number, watchlist: boolean) => {
    const response = await tmdb.post(`/account/{account_id}/watchlist`, {
        media_type: "movie",
        media_id: mediaId,
        watchlist,
    }, {
        params: { session_id: sessionId },
    });
    return response.data;
}

export const getFavoriteMovies = async (sessionId: string) => {
    const response = await tmdb.get(`/account/{account_id}/favorite/movies`, {
        params: { session_id: sessionId }
    });
    return response.data.results;
};

export const getWatchlistMovies = async (sessionId: string) => {
    const response = await tmdb.get(`/account/{account_id}/watchlist/movies`, {
        params: { session_id: sessionId }
    });
    return response.data.results;
};