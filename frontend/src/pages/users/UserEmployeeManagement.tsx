// src/pages/admin/UserEmployeeManagement.tsx
import { useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import UserManagementTable from "./partials/UserManagementTable";
import EmployeeCreateForm from "./partials/EmployeeCreateForm";
import EmployeeManagementTable from "./partials/EmployeeManagementTable";

const UserEmployeeManagement = () => {
  const [tab, setTab] = useState<"USERS" | "EMPLOYEES">("USERS");

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-screen-xl mx-auto">
          {/* Header & Tab Switch */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {tab === "USERS" ? "User Management" : "Employee Management"}
            </h2>
            <div className="space-x-4">
              <button
                onClick={() => setTab("USERS")}
                className={`px-4 py-2 rounded ${
                  tab === "USERS" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setTab("EMPLOYEES")}
                className={`px-4 py-2 rounded ${
                  tab === "EMPLOYEES" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                Employees
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {tab === "USERS" ? (
            <UserManagementTable />
          ) : (
            <>
              <EmployeeCreateForm />
              <EmployeeManagementTable />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserEmployeeManagement;
