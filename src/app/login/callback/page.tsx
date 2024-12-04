'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { GOOGLE_ACCESS_TOKEN,REFRESH_TOKEN } from "@/utils/tokens";
import {useAuth} from "@/context/AuthContext"

export default function LoginCallback() {
    const {login,logout} = useAuth();
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");

    if (accessToken && refreshToken) {
        login(accessToken, refreshToken)
        
      router.push("/chats");
    } else {
      // Redirect to login if tokens are missing
      router.push("/login");
    }
  }, [router]);

  return <div>Processing login...</div>;
}
