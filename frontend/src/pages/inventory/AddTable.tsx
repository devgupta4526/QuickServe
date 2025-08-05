import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";
import { createTable } from "../../lib/api";

export default function AddTable() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const { outletId } = useParams<{ outletId: string }>();
    console.log(outletId);


    const [form, setForm] = useState({
        tableNo: "",
        seats: 1,
        status: "Available",
    });

    const mutation = useMutation({
        mutationFn: () =>
            createTable({
                ...form,
                outletId: outletId!,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tables", outletId] });
            navigate(`/pos-dashboard/${outletId}/tables`);
        },
        onError: () => {
            alert("❌ Failed to add table.");
        },
    });

    const handleChange = (field: string, value: string | number) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        if (!form.tableNo || !form.seats) {
            alert("Please fill all required fields.");
            return;
        }
        mutation.mutate();
    };

    return (
        <div className="flex min-h-screen bg-[#FAFAFA]">
            <Sidebar />

            <main className="flex-1 p-6">
                <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-xl font-bold mb-4">➕ Add Table</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Table No</label>
                            <input
                                type="text"
                                className="w-full border px-3 py-2 rounded"
                                placeholder="e.g. A1"
                                value={form.tableNo}
                                onChange={(e) => handleChange("tableNo", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Seats</label>
                            <input
                                type="number"
                                className="w-full border px-3 py-2 rounded"
                                min={1}
                                value={form.seats}
                                onChange={(e) => handleChange("seats", Number(e.target.value))}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                className="w-full border px-3 py-2 rounded"
                                value={form.status}
                                onChange={(e) => handleChange("status", e.target.value)}
                            >
                                <option value="Available">Available</option>
                                <option value="Booked">Booked</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <Button
                                className="bg-gray-300 text-black hover:bg-gray-400"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="bg-black text-white hover:bg-gray-800"
                                onClick={handleSubmit}
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? "Adding..." : "Add Table"}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
