import { useState, useEffect, createContext } from "react";
import axios from "axios";

const API_URL = "https://style-script.onrender.com";
// const API_URL = "http://localhost:5005";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);


  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const user = response.data;
          setUser(user);

          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsLoggedIn(false);
          setUser(null);
        });
    } else {
      setIsLoading(false);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        removeToken,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
