export const getSessionId = (): string => {
    const sessionId = localStorage.getItem("tmdb_session_id");
    if (!sessionId) throw new Error("No session ID");
    return sessionId;
};
