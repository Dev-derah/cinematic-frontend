import { useRouter } from "next/router";

const ProtectedPage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const apiUrl = process.env.NEXT_BACKEND_API_URL;
    await fetch(`${apiUrl}/api/logout`, {
      method: "POST",
      credentials: "include",
    });

    router.push("/login");
  };

  return (
    <div>
      <h1>This is a Protected Page</h1>
      <p>You can only see this page if you are logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProtectedPage;
