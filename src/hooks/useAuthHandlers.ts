import { useRequestToken, useLogout } from './useAuth';

export const useAuthHandlers = () => {
    const requestToken = useRequestToken();
    const logout = useLogout();

    const handleLogin = () => {
        requestToken.mutate(undefined, {
            onSuccess: (token) => {
                const url = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:5173/auth/callback`;
                window.location.href = url;
            },
        });
    };

    const handleLogout = (onLogout?: () => void) => {
        logout.mutate(undefined, {
            onSuccess: () => {
                if (onLogout) onLogout();
            },
        });
    };

    return {
        handleLogin,
        handleLogout,
    };
};
