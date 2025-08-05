// src/pages/users/partials/EmployeeManagementTable.tsx

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllEmployees, deleteEmployee } from "../../../lib/api";
import { FaTrash } from "react-icons/fa";

const EmployeeManagementTable = () => {
  const queryClient = useQueryClient();

  const { data: employees = [], isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });

  const { mutate: removeEmployee } = useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load employees.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Outlet</th>
            <th className="text-left px-4 py-2">Position</th>
            <th className="text-center px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp: any) => (
            <tr key={emp._id} className="border-t">
              <td className="px-4 py-2">{emp.fullName}</td>
              <td className="px-4 py-2">{emp.outlet?.name || "N/A"}</td>
              <td className="px-4 py-2">{emp.position}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => removeEmployee(emp._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManagementTable;
