/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null, role: null });

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/v1/authentication/login", {
        email,
        password,
      });
      const { token } = response.data;
      const decodedToken = jwtDecode(token);

      setAuth({
        user: decodedToken.email,
        token,
        role: decodedToken.userType,
      });

      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setAuth({ user: null, token: null, role: null });
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setAuth({
        user: decodedToken.email,
        token,
        role: decodedToken.userType,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
