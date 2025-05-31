export interface CardMovieProps {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

export interface GetMovie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    genre_ids?: number[];
}

export interface MovieSliderProps {
    title: string;
    movies: GetMovie[];
}