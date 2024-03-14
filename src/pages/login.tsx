import { useEffect, useState } from "react";
import { GOOGLE_CLIENT_ID } from "../config";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:3000/api/auth/register";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleGoogle = async (response: { credential: string }) => {
    setLoading(true);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: response.credential }),
      });
      setLoading(false);
      const data = await res.json();

      localStorage.setItem("token", data.user.token);

      if (data?.user) {
        console.log("log: data", data);

        await login(data.user.token, data.user);
        navigate("/dashboard");
        console.log("log: data", data.user);
      } else {
        // Handle case where data.user is not available
        console.error("User data not found in the response.");
      }
    } catch (error) {
      // Handle fetch or JSON parsing errors
      console.error("Error occurred while fetching or parsing data:", error);
    }
  };

  useEffect(() => {
    /* global google */
    if ((window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID as string,
        callback: handleGoogle,
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById("loginDiv"),
        {
          // type: "standard",
          theme: "filled_black",
          // size: "small",
          text: "signin_with",
          shape: "pill",
        }
      );

      if ((window as any).google) (window as any).google.accounts.id.prompt();
    }
  }, [handleGoogle]);

  return (
    <>
      <h1>Login</h1>

      <div id="loginDiv">Login</div>
    </>
  );
}
