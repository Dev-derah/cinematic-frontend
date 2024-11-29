'use client'
import { GoogleButton } from "@/components/GoogleButton";
import React from "react";

type Props = {};

export default function page({}: Props) {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/accounts/google/login/";
  };
  return (
    <div>
      <GoogleButton label="Signin with Google" onClick={handleGoogleLogin} />
    </div>
  );
}
