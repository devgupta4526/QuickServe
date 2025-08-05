import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { adjustInventoryStock, getInventoryByOutlet } from "../../lib/api";

const StockAdjustment = () => {
    const { outletId } = useParams();

    const [adjustment, setAdjustment] = useState<{
        itemName: string;
        reason: string;
        type: "increase" | "decrease";
        quantity: string;
    }>({
        itemName: "",
        reason: "",
        type: "increase",
        quantity: "",
    });

    const { data: inventoryItems, isLoading: isInventoryLoading } = useQuery({
        queryKey: ["inventory", outletId],
        queryFn: () => getInventoryByOutlet(outletId!),
        enabled: !!outletId,
    });

    const { mutate: applyAdjustment, isPending, isError, isSuccess } = useMutation({
        mutationFn: adjustInventoryStock,
        onSuccess: () => {
            setAdjustment({
                itemName: "",
                reason: "",
                type: "increase",
                quantity: "",
            });
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAdjustment((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!outletId) return;

        applyAdjustment({
            outletId,
            itemName: adjustment.itemName,
            type: adjustment.type,
            quantity: Number(adjustment.quantity),
            reason: adjustment.reason || undefined,
        });
    };

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-8">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Stock Adjustment</h2>

                    {isError && <p className="text-red-500 mb-4">Failed to adjust stock</p>}
                    {isSuccess && <p className="text-green-600 mb-4">Stock adjusted successfully</p>}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {isInventoryLoading ? (
                            <p>Loading items...</p>
                        ) : (
                            <select
                                name="itemName"
                                value={adjustment.itemName}
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded"
                                required
                            >
                                <option value="">Select Item</option>
                                {inventoryItems?.map((item: any) => (
                                    <option key={item._id} value={item.name}>
                                        {item.name} (Current: {item.quantity} {item.unit})
                                    </option>
                                ))}
                            </select>
                        )}

                        <select
                            name="type"
                            value={adjustment.type}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                        >
                            <option value="increase">Increase Stock</option>
                            <option value="decrease">Decrease Stock</option>
                        </select>

                        <input
                            type="number"
                            name="quantity"
                            value={adjustment.quantity}
                            onChange={handleChange}
                            placeholder="Quantity"
                            className="w-full border px-4 py-2 rounded"
                            required
                        />

                        <input
                            type="text"
                            name="reason"
                            value={adjustment.reason}
                            onChange={handleChange}
                            placeholder="Reason for Adjustment (optional)"
                            className="w-full border px-4 py-2 rounded"
                        />

                        <Button type="submit" disabled={isPending} className="mt-4">
                            {isPending ? "Applying..." : "Apply Adjustment"}
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default StockAdjustment;
