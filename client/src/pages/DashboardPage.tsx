import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";

import LeadsTable from "../components/LeadsTable";

import AddLeadForm from "../components/AddLeadForm";

import { CSVLink } from "react-csv";

import DarkModeToggle from "../components/DarkModeToggle";

interface Lead {
  _id: string;

  name: string;

  email: string;

  status: string;

  source: string;
}

function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [source, setSource] = useState("");

  const [sort, setSort] = useState("latest");

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/leads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        params: {
          page: currentPage,

          search: debouncedSearch,

          source,

          sort,
        },
      });

      setLeads(response.data.leads);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchLeads();
  }, [debouncedSearch, source, sort, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, source, sort]);

  return (
    <div
      className={`

  min-h-screen

  ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-black"}

`}
    >
      <Navbar darkMode={darkMode} />

      <div className="p-8">
        <div
          className="
  flex
  justify-between
  items-center
  mb-6
"
        >
          <h1
            className="
    text-3xl
    font-bold
  "
          >
            Leads Dashboard
          </h1>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <CSVLink
            data={leads}
            filename="leads.csv"
            className="
            bg-green-700
            hover:bg-green-600
            transition
    text-white
    px-4
    py-2
    rounded-md
  "
          >
            Export CSV
          </CSVLink>
        </div>

        <div
          className="
  flex
  flex-col
  md:flex-row
  gap-4
  mb-6
"
        >
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`

              border
              p-3
              rounded-md
              flex-1
              
              ${
                darkMode
                  ? "bg-gray-900 text-white border-gray-600"
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
                  ? "bg-gray-900 text-white border-gray-600"
                  : "bg-white text-black"
              }
              
              `}
          >
            <option value="">All Sources</option>

            <option value="Instagram">Instagram</option>

            <option value="Website">Website</option>

            <option value="Referral">Referral</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={`

              border
              p-3
              rounded-md
              
              ${
                darkMode
                  ? "bg-gray-900 text-white border-gray-600"
                  : "bg-white text-black"
              }
              
              `}
          >
            <option value="latest">Latest</option>

            <option value="oldest">Oldest</option>
          </select>
        </div>

        <AddLeadForm fetchLeads={fetchLeads} darkMode={darkMode} />

        {loading ? (
          <div
            className={`

            p-6
            rounded-lg
            text-center
            
            ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
            
            `}
          >
            Loading leads...
          </div>
        ) : (
          <LeadsTable leads={leads} darkMode={darkMode} fetchLeads={fetchLeads} />
        )}
        <div
          className="
  flex
  justify-center
  items-center
  gap-4
  mt-6
"
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="
    bg-gray-800
    hover:bg-gray-700
    transition
    text-white
    px-4
    py-2
    rounded-md
    disabled:opacity-50
  "
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="
            bg-gray-800
            hover:bg-gray-700
            transition
    text-white
    px-4
    py-2
    rounded-md
    disabled:opacity-50
  "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
