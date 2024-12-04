'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axiosClient from "@/utils/axiosClient";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any; 
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user: User | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  fetchUserDetails: () => Promise<void>;
  loginUser: (username: string, password: string) => Promise<void>;
  registerUser: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!Cookies.get("ACCESS_TOKEN");
  });
  const [user, setUser] = useState<User | null>(null);
   const router  = useRouter();
useEffect(() => {
  const token = Cookies.get("ACCESS_TOKEN");
  if (token) {
    fetchUserDetails().finally(() => setIsAuthLoading(false));
  } else {
    setIsAuthLoading(false);
  }
}, []);

   const login = (accessToken: string, refreshToken: string) => {
    Cookies.set("ACCESS_TOKEN", accessToken);
    Cookies.set("REFRESH_TOKEN", refreshToken);
    setIsAuthenticated(true);
  };

const logout = async () => {
  const logoutToast = toast.loading("Logging out...");
  const refresh = Cookies.get("REFRESH_TOKEN"); 
  if (!refresh) {
    console.error("Refresh token not found.");
    return;
  }

  try {
    const response = await axiosClient.post("/api/users/logout/", { refresh });
    if (response.status === 200) {
      Cookies.remove("ACCESS_TOKEN", { path: "/" });
      Cookies.remove("REFRESH_TOKEN", { path: "/" });
      // Update auth state
      setIsAuthenticated(false);
      setUser(null);
      toast.success("Logout Sucessful", {
        id: logoutToast
      });
      router.push('/')
    } else {
      console.error("Logout failed:", response.data);
    }
  } catch (err) {
    toast.error("Logout Unsuccessful Try again", {
      id: logoutToast,
    });
  }
};

  const fetchUserDetails = async () => {
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
  
  const loginUser = async (username: string, password: string) => {
    const loginToast = toast.loading("Loading...");
    try {
      const response = await axiosClient.post(`${baseUrl}/api/users/login/`, {
        username,
        password,
      });

      const { access, refresh } =
        response.data;
      login(access, refresh);
      fetchUserDetails()
      toast.success("Login Sucessful", {
        id: loginToast,
      });
    } catch (error) {
      toast.error(`Login Unsucessful ${error}`, {
        id: loginToast,
      });
    }
  };

  // Local register function
  const registerUser = async (
    username: string,
    email: string,
    password: string,
    retype_password: string
  ) => {
    try {
      if (password !== retype_password) {
        throw new Error("Passwords do not match");
      }

      await axiosClient.post(`${baseUrl}/api/users/register/`, {
        username,
        email,
        password,
        retype_password,
      });

      console.log("Registration successful. Please log in.");
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed. Please try again.");
    }
  };


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        fetchUserDetails,
        loginUser,
        registerUser,
        isAuthLoading
      }}
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
