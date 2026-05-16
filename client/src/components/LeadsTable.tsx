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
}

function LeadsTable({ leads, darkMode }: Props) {
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadsTable;
