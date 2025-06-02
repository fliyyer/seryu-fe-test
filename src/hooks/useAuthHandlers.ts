import { useRequestToken, useLogout } from './useAuth';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useAuthHandlers = () => {
    const { mutate: requestToken } = useRequestToken();
    const { mutate: logout } = useLogout();

    const handleLogin = () => {
        requestToken(undefined, {
            onSuccess: (token) => {
                window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${BASE_URL}/auth/callback`;
            },
        });
    };

    const handleLogout = () => logout();

    return { handleLogin, handleLogout };
};
