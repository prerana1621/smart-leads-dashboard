import { useState } from "react";

import api from "../api/axios";

import toast from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
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

        await api.post("/auth/register", {
          name,
        email,
        password,
      });

      toast.success("Registration successful");

      navigate("/");
    } catch (error: any) {

        console.log(error.response?.data);
      
        toast.error(
          error.response?.data?.message || "Registration failed"
        );
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
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="
    w-full
    border
    p-3
    rounded-md
  "
          />
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
