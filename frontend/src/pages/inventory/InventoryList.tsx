import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { FiPlus, FiEdit, FiAlertTriangle, FiSliders, FiPackage, FiBox } from "react-icons/fi";
import Sidebar from "../../components/ui/Sidebar";
import { getInventoryByOutlet } from "../../lib/api";

const InventoryList = () => {
    const { outletId } = useParams();

    const { data: inventory = [], isLoading, isError } = useQuery({
        queryKey: ["inventory", outletId],
        queryFn: () => getInventoryByOutlet(outletId!),
        enabled: !!outletId,
    });

    // Dashboard metrics
    const totalItems = inventory.length;
    const lowStockCount = inventory.filter((item: any) => item.status === "Low Stock").length;
    const outOfStockCount = inventory.filter((item: any) => item.status === "Out of Stock").length;

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-8 space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800">Inventory Dashboard</h2>
                    <div className="flex gap-3">
                        <Link
                            to={`/inventory/${outletId}/alerts`}
                            className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 text-sm"
                        >
                            <FiAlertTriangle className="w-4 h-4" />
                            Low Stock Alerts
                        </Link>
                        <Link
                            to={`/inventory/${outletId}/adjustment`}
                            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm"
                        >
                            <FiSliders className="w-4 h-4" />
                            Stock Adjustment
                        </Link>
                        <Link
                            to={`/inventory/${outletId}/add`}
                            className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 text-sm"
                        >
                            <FiPlus className="w-4 h-4" />
                            Add Item
                        </Link>
                    </div>
                </div>

                {/* Dashboard cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-gray-100 border rounded-lg p-4 shadow-sm flex items-center gap-4">
                        <FiPackage className="w-8 h-8 text-indigo-600" />
                        <div>
                            <p className="text-sm text-gray-500">Total Items</p>
                            <p className="text-xl font-bold text-gray-800">{totalItems}</p>
                        </div>
                    </div>

                    <div className="bg-yellow-100 border rounded-lg p-4 shadow-sm flex items-center gap-4">
                        <FiAlertTriangle className="w-8 h-8 text-yellow-600" />
                        <div>
                            <p className="text-sm text-yellow-700">Low Stock</p>
                            <p className="text-xl font-bold text-yellow-800">{lowStockCount}</p>
                        </div>
                    </div>

                    <div className="bg-red-100 border rounded-lg p-4 shadow-sm flex items-center gap-4">
                        <FiBox className="w-8 h-8 text-red-600" />
                        <div>
                            <p className="text-sm text-red-700">Out of Stock</p>
                            <p className="text-xl font-bold text-red-800">{outOfStockCount}</p>
                        </div>
                    </div>
                </div>

                {/* Inventory table */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">All Inventory Items</h3>

                    {isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p className="text-red-500">Failed to load inventory</p>
                    ) : (
                        <table className="w-full border text-sm text-left text-gray-600 shadow-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3">Item</th>
                                    <th className="px-4 py-3">Stock</th>
                                    <th className="px-4 py-3">Unit</th>
                                    <th className="px-4 py-3">Low Threshold</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map((item: any) => (
                                    <tr key={item._id} className="border-t">
                                        <td className="px-4 py-2">{item.name}</td>
                                        <td className="px-4 py-2">{item.quantity}</td>
                                        <td className="px-4 py-2">{item.unit}</td>
                                        <td className="px-4 py-2">{item.threshold}</td>
                                        <td className="px-4 py-2">
                                            {item.status === "Low Stock" || item.status === "Out of Stock" ? (
                                                <span className="text-red-600 font-semibold">{item.status}</span>
                                            ) : (
                                                <span className="text-green-600 font-semibold">{item.status}</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            <Link
                                                to={`/inventory/${outletId}/edit/${item._id}`}
                                                className="text-indigo-600 hover:underline flex items-center gap-1"
                                            >
                                                <FiEdit className="w-4 h-4" />
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
};

export default InventoryList;
