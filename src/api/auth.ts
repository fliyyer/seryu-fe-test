import { tmdb } from "./tmdb";

export const getRequestToken = async () => {
    const { data } = await tmdb.get('/authentication/token/new');
    return data.request_token;
};

export const createSessionId = async (requestToken: string) => {
    const { data } = await tmdb.post("/authentication/session/new", {
        request_token: requestToken,
    });
    return data.session_id;
};

export const deleteSessionId = async (sessionId: string) => {
    return tmdb.delete('/authentication/session', {
        data: { session_id: sessionId },
    });
};