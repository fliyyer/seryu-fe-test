import { useRequestToken, useLogout } from './useAuth';
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const useAuthHandlers = () => {
    const requestToken = useRequestToken();
    const logout = useLogout();

    const handleLogin = () => {
        requestToken.mutate(undefined, {
            onSuccess: (token) => {
                const url = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${BASE_URL}/auth/callback`;
                window.location.href = url;
            },
        });
    };

    const handleLogout = () => {
        logout.mutate();
    }

    return {
        handleLogin,
        handleLogout,
    };
};
