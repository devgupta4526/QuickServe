import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getInventoryItemById, updateInventoryItem } from "../../lib/api";

const EditInventoryItem = () => {
    const navigate = useNavigate();
    const { outletId, id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
        unit: "",
        threshold: "",
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["inventory", id],
        queryFn: () => getInventoryItemById(id!),
        enabled: !!id,
    });

    useEffect(() => {
        if (data) {
            setFormData({
                name: data.name,
                quantity: data.quantity.toString(),
                unit: data.unit,
                threshold: data.threshold.toString(),
            });
        }
    }, [data]);

    type InventoryUpdateInput = {
        name: string;
        quantity: number;
        unit: string;
        threshold: number;
    };

    const { mutate: updateItem, isPending } = useMutation({
        mutationFn: (updatedData: InventoryUpdateInput) => updateInventoryItem(id!, updatedData),
        onSuccess: () => navigate(`/inventory/${outletId}`),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateItem({
            name: formData.name,
            quantity: +formData.quantity,
            unit: formData.unit,
            threshold: +formData.threshold,
        });
    };

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-8">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Edit Inventory Item
                    </h2>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p className="text-red-500">Failed to load item</p>
                    ) : (
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Item Name"
                                required
                                className="w-full border px-4 py-2 rounded"
                            />
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="Stock"
                                required
                                className="w-full border px-4 py-2 rounded"
                            />
                            <input
                                type="text"
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                placeholder="Unit"
                                required
                                className="w-full border px-4 py-2 rounded"
                            />
                            <input
                                type="number"
                                name="threshold"
                                value={formData.threshold}
                                onChange={handleChange}
                                placeholder="Low Stock Threshold"
                                required
                                className="w-full border px-4 py-2 rounded"
                            />
                            <Button type="submit" className="mt-4" disabled={isPending}>
                                {isPending ? "Saving..." : "Save Changes"}
                            </Button>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditInventoryItem;
