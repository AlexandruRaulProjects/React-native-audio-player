import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: () => { },
    logout: () => { },
});

function AuthContextProvider({ children }) {

    const [authToken, setAuthToken] = useState();

    useEffect(() => {
        async function fetchToken() {

            const storedToken = AsyncStorage.getItem('token');

            if (storedToken) {
                authCtx.authenticate(storedToken);
            }
        }

        fetchToken();
    }, []);


    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    function logout() {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;