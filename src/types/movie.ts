export interface CardMovieProps {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    isInitiallyFavorite?: boolean;
    isInitiallyInWatchlist?: boolean;
    genre_ids?: number[];
    is_favorite?: boolean;
    is_watchlist?: boolean;
}

export interface GetMovie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    genre_ids?: number[];
    overview?: string;
    runtime?: number;
    backdrop_path?: string;
}

export interface MovieSliderProps {
    title: string;
    movies: GetMovie[];
}