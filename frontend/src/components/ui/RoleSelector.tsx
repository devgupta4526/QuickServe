// src/components/common/RoleSelector.tsx

import React from 'react';

interface RoleOption {
  value: string;
  label: string;
}

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options?: RoleOption[];
}

const defaultRoles: RoleOption[] = [
  { value: "ADMIN", label: "Admin" },
  { value: "MANAGER", label: "Manager" },
  { value: "CASHIER", label: "Cashier" },
  { value: "WAITER", label: "Waiter" },
  { value: "KITCHEN", label: "Kitchen" },
];

const RoleSelector: React.FC<RoleSelectorProps> = ({ value, onChange, options }) => {
  const rolesToRender = options || defaultRoles;

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">Role</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="" disabled>Select a role</option>
        {rolesToRender.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleSelector;
