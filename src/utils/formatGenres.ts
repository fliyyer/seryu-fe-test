import { genreMap } from "../constant/genre";

export const formatGenres = (genreIds: number[]): string => {
    return genreIds.map(id => genreMap[id]).filter(Boolean).join(', ');
};
