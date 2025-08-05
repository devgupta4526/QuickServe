import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "../../components/ui/Sidebar";
import { getInventoryByOutlet } from "../../lib/api";

const LowStockAlerts = () => {
    const { outletId } = useParams();

    const { data: inventory = [], isLoading, isError } = useQuery({
        queryKey: ["inventory", outletId],
        queryFn: () => getInventoryByOutlet(outletId!),
        enabled: !!outletId,
    });

    const lowStockItems = inventory.filter(
        (item: any) => item.quantity <= item.threshold
    );

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-8">
                <h2 className="text-2xl font-bold text-red-600 mb-6">
                    Low Stock Alerts
                </h2>

                {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                    <p className="text-red-500">Failed to fetch inventory</p>
                ) : lowStockItems.length === 0 ? (
                    <p className="text-gray-600">All items are sufficiently stocked.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {lowStockItems.map((item: any) => (
                            <div key={item._id} className="p-4 border rounded shadow-sm bg-red-50">
                                <h3 className="text-lg font-semibold text-red-700">{item.name}</h3>
                                <p className="text-sm text-gray-700">
                                    Current Stock: <strong>{item.quantity}</strong> {item.unit}
                                </p>
                                <p className="text-sm text-gray-700">
                                    Minimum Required: {item.threshold} {item.unit}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default LowStockAlerts;
