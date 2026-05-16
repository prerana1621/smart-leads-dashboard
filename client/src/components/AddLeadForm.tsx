import { useState } from "react";

import api from "../api/axios";

import toast from "react-hot-toast";

interface Props {
  fetchLeads: () => void;
  darkMode: boolean;
}

function AddLeadForm({ darkMode }: Props) {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [source, setSource] = useState("Website");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("All fields are required");

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");

      return;
    }
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await api.post(
        "/leads",

        {
          name,
          email,
          source,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setName("");
      setEmail("");
      setSource("Website");

      toast.success("Lead added successfully");
    } catch (error) {
      toast.error("Failed to add lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
        p-6
        rounded-lg
        shadow-sm
        mb-6
        grid
        md:grid-cols-4
        gap-4
      `}
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={`

          border
          p-3
          rounded-md
          
          ${
            darkMode
              ? "border-gray-600 bg-gray-900 text-white"
              : "bg-white text-black"
          }
          
          `}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={`

          border
          p-3
          rounded-md
          
          ${
            darkMode
              ? "border-gray-600 bg-gray-900 text-white"
              : "bg-white text-black"
          }
          
          `}
      />

      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className={`

          border
          p-3
          rounded-md
          
          ${
            darkMode
              ? "border-gray-600 bg-gray-900 text-white"
              : "bg-white text-black"
          }
          
          `}
      >
        <option value="Website">Website</option>

        <option value="Instagram">Instagram</option>

        <option value="Referral">Referral</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="
    bg-gray-700
    hover:bg-gray-600
    transition
    text-white
    rounded-md
    py-3
    font-semibold
  "
      >
        {loading ? "Adding..." : "Add Lead"}
      </button>
    </form>
  );
}

export default AddLeadForm;
