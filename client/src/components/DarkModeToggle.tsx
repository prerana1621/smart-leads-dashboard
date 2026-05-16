interface Props {
  darkMode: boolean;

  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function DarkModeToggle({ darkMode, setDarkMode }: Props) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`

        px-4
        py-2
        rounded-md
        transition
        
        ${
          darkMode
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-white text-black border hover:bg-gray-100"
        }
        
        `}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default DarkModeToggle;
