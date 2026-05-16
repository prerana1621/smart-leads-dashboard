import { useNavigate } from "react-router-dom";

interface Props {
  darkMode: boolean;
}

function Navbar({ darkMode }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div
      className={`
        shadow-sm
        px-8
        py-4
        flex
        justify-between
        items-center
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}
      `}
    >
      <h1
        className="
          text-2xl
          font-bold
        "
      >
        Smart Leads
      </h1>

      <button
        onClick={handleLogout}
        className="
        bg-gray-800
        hover:bg-gray-700
        transition
          text-white
          px-4
          py-2
          rounded-md
        "
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
