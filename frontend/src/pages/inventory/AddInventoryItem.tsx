import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button2";
import { createInventoryItem } from "../../lib/api";

const AddInventoryItem = () => {
    const navigate = useNavigate();
    const { outletId } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
        unit: "",
        threshold: "",
    });

    const { mutate: createItem, isPending, isError } = useMutation({
        mutationFn: createInventoryItem,
        onSuccess: () => navigate(`/inventory/${outletId}`),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!outletId) return;

        createItem({
            name: formData.name,
            quantity: +formData.quantity,
            unit: formData.unit,
            threshold: +formData.threshold,
            outletId,
        });
    };

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-8">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Inventory Item</h2>
                    {isError && <p className="text-red-500 mb-3">Failed to create item</p>}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" required className="w-full border px-4 py-2 rounded" />
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Initial Stock" required className="w-full border px-4 py-2 rounded" />
                        <input type="text" name="unit" value={formData.unit} onChange={handleChange} placeholder="Unit (e.g., pcs, litres)" required className="w-full border px-4 py-2 rounded" />
                        <input type="number" name="threshold" value={formData.threshold} onChange={handleChange} placeholder="Low Stock Threshold" required className="w-full border px-4 py-2 rounded" />
                        <Button type="submit" disabled={isPending} className="mt-4">
                            {isPending ? "Saving..." : "Save Item"}
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddInventoryItem;
