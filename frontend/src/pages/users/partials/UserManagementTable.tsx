// src/pages/users/partials/UserManagementTable.tsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getAllUsers, toggleUserActive, updateUserRole } from "../../../lib/api";
import { FaTrash, FaUserEdit } from "react-icons/fa";

const roles = ["ADMIN", "MANAGER", "CASHIER", "WAITER", "KITCHEN"];

const UserManagementTable = () => {
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["users"], queryFn: getAllUsers });

  const { mutate: updateRole } = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      updateUserRole(id, role),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const { mutate: toggleStatus } = useMutation({
    mutationFn: (id: string) => toggleUserActive(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const { mutate: removeUser } = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div className="text-red-500">{(error as any)?.message}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-center">Verified</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u._id} className="border-t">
              <td className="px-4 py-2">{u.fullName}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">
                <select
                  value={u.role}
                  onChange={(e) => updateRole({ id: u._id, role: e.target.value })}
                  className="border px-2 py-1 rounded"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </td>
              <td className="text-center px-4 py-2">
                <input
                  type="checkbox"
                  checked={u.verified}
                  onChange={() => toggleStatus(u._id)}
                  className="accent-indigo-600"
                />
              </td>
              <td className="text-center px-4 py-2 flex gap-3 justify-center">
                <button
                  onClick={() => removeUser(u._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
                <button className="text-blue-500 hover:text-blue-700">
                  <FaUserEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementTable;
