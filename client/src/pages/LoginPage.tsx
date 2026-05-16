import { useState } from "react";

import api from "../api/axios";

import toast from "react-hot-toast";

function LoginPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required");

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");

      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");

      return;
    }
    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login successful");
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
    "
    >
      <div
        className="
        bg-white
        p-8
        rounded-lg
        shadow-md
        w-full
        max-w-md
      "
      >
        <h2
          className="
          text-2xl
          font-bold
          mb-6
          text-center
        "
        >
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full
              border
              p-3
              rounded-md
            "
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full
              border
              p-3
              rounded-md
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-black
              text-white
              p-3
              rounded-md
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
