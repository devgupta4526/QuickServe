// src/pages/users/partials/EmployeeCreateForm.tsx

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEmployee, getAllOutlets } from "../../../lib/api";
import { useBusiness } from "../../../hooks/useBusiness";

const positions = ["CASHIER", "KITCHEN", "WAITER", "MANAGER"];

const EmployeeCreateForm = () => {
    const queryClient = useQueryClient();
    const business = useBusiness();

    const [data, setData] = useState({
        fullName: "",
        outlet: "",
        business: business?._id || "",
        position: "",
        roles: [] as string[],
    });

    const { data: outlets } = useQuery({
        queryKey: ["outlets"],
        queryFn: getAllOutlets,
    });

    const { mutate: addEmployee, status } = useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            setData({
                fullName: "",
                outlet: "",
                business: business?._id || "",
                position: "",
                roles: [],
            });
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.fullName || !data.outlet || !data.position) return;
        addEmployee(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name="fullName"
                placeholder="Full Name"
                value={data.fullName}
                onChange={handleChange}
                className="border px-3 py-2 w-full rounded"
            />
            <select
                name="outlet"
                value={data.outlet}
                onChange={handleChange}
                className="border px-3 py-2 w-full rounded"
            >
                <option value="">Select Outlet</option>
                {outlets?.map((o: any) => (
                    <option key={o._id} value={o._id}>
                        {o.name}
                    </option>
                ))}
            </select>
            <select
                name="position"
                value={data.position}
                onChange={handleChange}
                className="border px-3 py-2 w-full rounded"
            >
                <option value="">Select Position</option>
                {positions.map((p) => (
                    <option key={p} value={p}>
                        {p}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                disabled={status === "pending"}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                {status === "pending" ? "Adding..." : "Add Employee"}
            </button>
        </form>
    );
};

export default EmployeeCreateForm;
