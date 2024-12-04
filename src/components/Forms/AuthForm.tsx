"use client";
import React from "react";
import { GoogleButton } from "@/components/GoogleButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { InputField } from "../Inputs/AuthInput";
import { isNotEmpty, isEmail, minLength } from "@/utils/validators";
import { useFormInput } from "@/utils/hooks/useFormInput";
import { useAuth } from "@/context/AuthContext";

type Props = {
  formType: "Registration" | "Login";
};
export default function AuthForm({ formType }: Props) {
  const router = useRouter();
  const { registerUser, loginUser } = useAuth();
  const isRegistration = formType === "Registration";
  const handleGoogleLogin = () => {
    window.location.href =
      `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=642321107794-6p8stc05rvn2g4fi2htqofbqiraj30v2.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Faccounts%2Fgoogle%2Flogin%2Fcallback%2F&scope=email%20profile&response_type=code&access_type=online&code_challenge_method=S256&flowName=GeneralOAuthFlow`;
  };
  const handleGoogleRegistration = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=642321107794-6p8stc05rvn2g4fi2htqofbqiraj30v2.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Faccounts%2Fgoogle%2Flogin%2Fcallback%2F&scope=email%20profile&response_type=code&access_type=online&code_challenge_method=S256&flowName=GeneralOAuthFlow";
  };

  const emailInput = useFormInput({
    validate: [isNotEmpty("email"), isEmail],
  });

  const usernameInput = useFormInput({
    validate: [isNotEmpty("username"), minLength(6)],
  });

  const passwordInput = useFormInput({
    validate: [isNotEmpty("password"), minLength(6)],
  });

  const retype_PasswordInput = useFormInput({
    validate: [isNotEmpty("retype_password")],
  });
  const isFormInvalid = Boolean(
    isRegistration
      ? !usernameInput.value ||
          !emailInput.value ||
          !passwordInput.value ||
          !retype_PasswordInput.value ||
          usernameInput.error ||
          emailInput.error ||
          passwordInput.error ||
          retype_PasswordInput.error ||
          passwordInput.value !== retype_PasswordInput.value
      : !usernameInput.value ||
          !passwordInput.value ||
          usernameInput.error ||
          passwordInput.error
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isRegistration) {
        if (!usernameInput.value || !emailInput.value || !passwordInput.value) {
          throw new Error("Please fill in all required fields.");
        }
        if (passwordInput.value !== retype_PasswordInput.value) {
          throw new Error("Passwords do not match.");
        }

        await registerUser(
          usernameInput.value,
          emailInput.value,
          passwordInput.value,
          retype_PasswordInput.value
        );
        console.log("Registration successful!");
        router.push("/login");
      } else {
        if (!usernameInput.value || !passwordInput.value) {
          throw new Error("Please fill in all required fields.");
        }
        await loginUser(usernameInput.value, passwordInput.value);
        console.log("Login successful!");
        router.push("/chats");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert((error as Error).message);
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Cinemtic AI"
          src="/Images/Brand/Cinematic_AI.png"
          className="mx-auto w-auto cursor-pointer"
          width={100}
          height={20}
          onClick={()=>router.push('/')}
        />
        <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-300">
          {isRegistration ? "Create an account" : "Sign in to your account"}
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm border-gray-600 border rounded-md p-5 w-full md:w-3/4">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField
            id="username"
            label="Username"
            type="text"
            autoComplete="username"
            value={usernameInput.value}
            onBlur={usernameInput.onBlur}
            onChange={(e) => usernameInput.onChange(e.target.value)}
            error={usernameInput.error}
          />

          {isRegistration && (
            <InputField
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              value={emailInput.value}
              onBlur={emailInput.onBlur}
              onChange={(e) => emailInput.onChange(e.target.value)}
              error={emailInput.error}
            />
          )}
          <InputField
            id="password"
            label="Password"
            type="password"
            autoComplete={isRegistration ? "new-password" : "current-password"}
            value={passwordInput.value}
            onBlur={passwordInput.onBlur}
            onChange={(e) => passwordInput.onChange(e.target.value)}
            error={passwordInput.error}
          />
          {isRegistration && (
            <InputField
              id="retype_password"
              label="Retype Password"
              type="password"
              autoComplete={
                isRegistration ? "new-password" : "current-password"
              }
              value={retype_PasswordInput.value}
              onBlur={retype_PasswordInput.onBlur}
              onChange={(e) => retype_PasswordInput.onChange(e.target.value)}
              error={retype_PasswordInput.error}
            />
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-55 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-55 disabled:opacity-50"
              disabled={isFormInvalid}
            >
              {isRegistration ? "Sign up" : "Sign in"}
            </button>
          </div>
        </form>

        {/* Separator */}
        <div className="relative mt-6">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm/6">
            <span className="bg-black-08 px-2 text-gray-100 font-bold">or</span>
          </div>
        </div>

        {/* Google Button */}
        <div className="mt-4 w-full">
          <GoogleButton
            label={isRegistration ? "Signup with Google" : "Signin with Google"}
            onClick={
              isRegistration ? handleGoogleRegistration : handleGoogleLogin
            }
          />
        </div>
        {/* Footer */}
        <p className="mt-5 text-center text-sm/6 text-gray-300">
          {isRegistration ? (
            <>
              Already have an account?
              <button
                className="ml-1 font-semibold text-red-55 hover:text-red-400"
                onClick={() => router.push("/login")}
              >
                Sign in here
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?
              <button
                className="ml-1 font-semibold text-red-55 hover:text-red-400"
                onClick={() => router.push("/register")}
              >
                Sign up now
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
