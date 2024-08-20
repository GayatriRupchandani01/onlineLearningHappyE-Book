import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(Cookies.get("authToken") || null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      const decodedToken = JSON.parse(atob(authToken.split(".")[1]));
      setUser({
        id: decodedToken.id,
        username: decodedToken.sub,
        role: decodedToken.role,
        name: `${decodedToken.firstName} ${decodedToken.lastName}`,
      });
    }
  }, [authToken]);

  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:8080/user/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Invalid username or password");

      const data = await response.json();
      const { token } = data;
      const userId = data.user.id;
      const email = data.user.email;
      Cookies.set("email", email);
      navigate("/view-courses");

      Cookies.set("userId", userId);

      const role = data.user.role;
      Cookies.set("role", role);
      Cookies.set("userName", credentials.userName);
      Cookies.set("authToken", token);
      setAuthToken(token);
      toast.success("Login successful!");
      navigate("/view-courses");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch("http://localhost:8080/user/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Signup failed");

      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    setAuthToken(null);
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
