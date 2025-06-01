import { tmdb } from "./tmdb";

export const getRequestToken = async () => {
    const res = await tmdb.get("/authentication/token/new");
    return res.data.request_token;
};

export const createSessionId = async (requestToken: string) => {
    const res = await tmdb.post("/authentication/session/new", {
        request_token: requestToken,
    });
    return res.data.session_id;
};

export const deleteSessionId = async (sessionId: string) => {
    await tmdb.delete("/authentication/session", {
        data: { session_id: sessionId },
    });
};