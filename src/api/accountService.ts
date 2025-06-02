import { tmdb } from "./tmdb";

const path = (subPath: string) => `/account/{account_id}${subPath}`;

const withSession = (sessionId: string) => ({
    params: { session_id: sessionId },
});

export const markAsFavorite = async (sessionId: string, mediaId: number, favorite: boolean) => {
    const { data } = await tmdb.post(path('/favorite'),
        {
            media_type: 'movie',
            media_id: mediaId,
            favorite,
        },
        withSession(sessionId)
    );
    return data;
};

export const addToWatchlist = async (sessionId: string, mediaId: number, watchlist: boolean) => {
    const { data } = await tmdb.post(path('/watchlist'),
        {
            media_type: 'movie',
            media_id: mediaId,
            watchlist,
        },
        withSession(sessionId)
    );
    return data;
}

export const getFavoriteMovies = async (sessionId: string) => {
    const { data } = await tmdb.get(path('/favorite/movies'), withSession(sessionId));
    return data.results;
};

export const getWatchlistMovies = async (sessionId: string) => {
    const { data } = await tmdb.get(path('/watchlist/movies'), withSession(sessionId));
    return data.results;
};