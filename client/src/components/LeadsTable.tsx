import api from "../api/axios";

import toast from "react-hot-toast";

interface Lead {
  _id: string;

  name: string;

  email: string;

  status: string;

  source: string;
}

interface Props {
  leads: Lead[];
  darkMode: boolean;
  fetchLeads: () => void;
}

function LeadsTable({ leads, darkMode, fetchLeads }: Props) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/leads/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Lead deleted");

      fetchLeads();
    } catch (error) {
      toast.error("Delete failed");
    }
  };
  if (leads.length === 0) {
    return (
      <div
        className={`
        ${darkMode ? "bg-gray-900" : "bg-white"}
          p-6
          rounded-lg
          text-center
        `}
      >
        No leads available right now
      </div>
    );
  }

  return (
    <div
      className={`

      overflow-x-auto
      rounded-lg
      shadow-sm
      
      ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
      
      `}
    >
      <table
        className="
          w-full
          border-collapse
        "
      >
        <thead>
          <tr
            className={`

              text-left
              
              ${darkMode ? "bg-gray-700" : "bg-gray-100"}
              
              `}
          >
            <th className="p-4">Name</th>

            <th className="p-4">Email</th>

            <th className="p-4">Status</th>

            <th className="p-4">Source</th>
            {user?.role === "admin" && <th className="p-4">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className={`

                border-t
                transition
                
                ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}
                
                `}
            >
              <td className="p-4">{lead.name}</td>

              <td className="p-4">{lead.email}</td>

              <td className="p-4">
                <span
                  className={`
    px-3
    py-1
    rounded-full
    text-sm
    ${darkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-black"}
  `}
                >
                  {lead.status}
                </span>
              </td>

              <td className="p-4">{lead.source}</td>
              {user?.role === "admin" && (
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(lead._id)}
                    className="
        bg-red-600
        hover:bg-red-500
        text-white
        px-3
        py-1
        rounded-md
        transition
      "
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadsTable;
