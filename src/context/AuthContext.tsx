'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axiosClient from "@/utils/axiosClient";

interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any; 
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  fetchUserDetails: () => Promise<void>;
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get("ACCESS_TOKEN");
    setIsAuthenticated(!!token);

    if (token) {
      fetchUserDetails();
    }
    console.log('Auth provider mounted or token changed');
  }, []);

   const login = (accessToken: string, refreshToken: string) => {
    Cookies.set("ACCESS_TOKEN", accessToken);
    Cookies.set("REFRESH_TOKEN", refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("ACCESS_TOKEN", { path: "/" });
    Cookies.remove("REFRESH_TOKEN", { path: "/" });
    setIsAuthenticated(false);
    setUser(null);
  };

  const fetchUserDetails = async () => {
    console.log("Fetching user details")
    try {
      const token = Cookies.get("ACCESS_TOKEN");
      if (!token) {
        throw new Error("No access token available");
      }

      const response = await axiosClient.get<User>(`${baseUrl}/api/users/user-details/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      logout(); 
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, fetchUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
