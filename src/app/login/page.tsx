'use client'
import { useState } from "react";
import ContactForm from "@/components/Forms/ContactForm";
import { MovieGrid } from "@/components/MovieGrid";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const backendUrl = process.env.NEXT_BACKEND_API_URL
    console.log(backendUrl, process.env.NEXT_PUBLIC_TMDB_API_KEY);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (res.ok) {
        // Successful login, redirect to the protected page
        console.log('Success')
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    }
  };

  return (
  <main className="mt-[15vh] mb-[17vh] pl-[6vw] pr-[6vw] w-full">
      <section className="grid grid-rows w-full gap-10 justify-center h-fit lg:grid-cols-[30%_70%] md:mt-[6vh] lg:gap-20">
        <div className="space-y-10">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Welcome to our support page!
            </h1>
            <p className="text-grey-60">
              We are here to help you with any problems you may be having with
              our product.
            </p>
          </div>
          <div className="hidden md:block">
            <MovieGrid maxItems={12} hideAfter={8} isFixedBG={false} />
          </div>
        </div>
        <div className="bg-black-06 border border-black-15 rounded-lg w-full">
          <ContactForm />
        </div>
      </section>
    </main>
    // <div className="h-screen w-full flex flex-col items-center justify-center">
    //   <h1>Login</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       placeholder="username"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       required
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //     {error && <p style={{ color: "red" }}>{error}</p>}
    //     <button type="submit" className="bg-white">Login</button>
    //   </form>
    // </div>
  );
};

export default LoginPage;
