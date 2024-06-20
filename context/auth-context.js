import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  redefineProfile: () => {},
  getProfile: () => {},
  authenticate: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [profile, setProfile] = useState();

  authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
    }

    fetchToken();
  }, []);

  function authenticate(token, profile) {
    setAuthToken(token);
    setProfile(profile);
    AsyncStorage.setItem("token", token);
  }

  function getProfile() {
    return profile;
  }

  function redefineProfile(settings) {
    setProfile((currentProfile) => {
      return { ...currentProfile, settings };
    });
  }

  function logout() {
    setAuthToken(null);
    setProfile({});
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    getProfile: getProfile,
    redefineProfile: redefineProfile,
    profile: profile,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
