import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const roles = ["Cashier", "Kitchen Staff", "Manager", "Waiter", "Admin"];

interface StaffMember {
    id: string;
    name: string;
    role: string;
}

const RoleManagement = () => {
    const [staff, setStaff] = useState<StaffMember[]>([
        { id: "1", name: "Alice", role: "Cashier" },
        { id: "2", name: "Bob", role: "Kitchen Staff" },
    ]);
    const [formData, setFormData] = useState({ name: "", role: roles[0] });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        if (formData.name.trim()) {
            setStaff([...staff, { id: Date.now().toString(), ...formData }]);
            setFormData({ name: "", role: roles[0] });
        }
    };

    const handleDelete = (id: string) => {
        setStaff(staff.filter((s) => s.id !== id));
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Role Management</h2>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Staff Name"
                    className="border px-3 py-2 rounded w-full"
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded w-40"
                >
                    {roles.map((r) => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
                <button
                    onClick={handleAdd}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Add
                </button>
            </div>

            <ul className="divide-y">
                {staff.map((member) => (
                    <li key={member.id} className="py-2 flex justify-between items-center">
                        <span className="text-gray-700 font-medium">{member.name} ({member.role})</span>
                        <button onClick={() => handleDelete(member.id)} className="text-red-500 hover:text-red-700">
                            <FaTrash size={16} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoleManagement;
