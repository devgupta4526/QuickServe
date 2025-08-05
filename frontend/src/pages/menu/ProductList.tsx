import { useState } from "react";
import { Pencil, Trash2, AlertTriangle, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Sidebar from "../../components/ui/Sidebar";
import ConfirmModal from "../../components/ConfirmModal";
import { getProductsByOutlet } from "../../lib/api";

export default function ProductList() {
    const navigate = useNavigate();
    const { outletId } = useParams<{ outletId: string }>();
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({}); // default collapsed

    const {
        data: products = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products", outletId],
        queryFn: () => getProductsByOutlet(outletId!),
        enabled: Boolean(outletId),
    });

    const handleDelete = (id: string) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (deleteId) {
            // TODO: integrate API call to delete
            setShowModal(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Product Inventory</h2>
                    <button
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded inline-flex items-center"
                        onClick={() => navigate(`/add-product/${outletId}`)}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                    </button>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="p-3">Product</th>
                                <th>Category</th>
                                <th>Unit</th>
                                <th>Quantity</th>
                                <th>Threshold</th>
                                <th>Status</th>
                                <th>Variants</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={8} className="p-4 text-center text-gray-500">
                                        Loading products...
                                    </td>
                                </tr>
                            ) : isError ? (
                                <tr>
                                    <td colSpan={8} className="p-4 text-center text-red-500">
                                        Failed to load products.
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="p-4 text-center text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product: any) => {
                                    const id = product._id;
                                    const isExpanded = expandedRows[id] ?? false; // ⬅ default collapsed
                                    const isLowStock =
                                        product.threshold !== undefined &&
                                        product.quantity <= product.threshold;

                                    return (
                                        <>
                                            <tr key={id} className="align-top">
                                                <td className="px-3 py-2">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={product.imageUrl || "https://via.placeholder.com/50"}
                                                            alt={product.name}
                                                            className="w-10 h-10 rounded object-cover"
                                                        />
                                                        <span className="font-medium text-gray-900">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-2">{product.category || "—"}</td>
                                                <td className="py-2">{product.unit || "—"}</td>
                                                <td className="py-2">{product.quantity ?? "—"}</td>
                                                <td className="py-2">{product.threshold ?? "—"}</td>
                                                <td className="py-2">
                                                    {product.quantity > 0 ? (
                                                        isLowStock ? (
                                                            <span className="text-yellow-600 flex items-center gap-1">
                                                                <AlertTriangle className="w-4 h-4" />
                                                                Low Stock
                                                            </span>
                                                        ) : (
                                                            <span className="text-green-600 font-semibold">In Stock</span>
                                                        )
                                                    ) : (
                                                        <span className="text-red-600 font-semibold">Out of Stock</span>
                                                    )}
                                                </td>
                                                <td className="py-2 text-center">
                                                    <button
                                                        onClick={() =>
                                                            setExpandedRows((prev) => ({
                                                                ...prev,
                                                                [id]: !prev[id],
                                                            }))
                                                        }
                                                        className="text-indigo-600 hover:text-indigo-800"
                                                    >
                                                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                    </button>
                                                </td>
                                                <td className="py-2 text-center">
                                                    <div className="flex justify-center gap-3">
                                                        <button
                                                            onClick={() =>
                                                                navigate(`/edit-product/${outletId}/${product._id}`)
                                                            }
                                                            className="text-blue-500 hover:text-blue-700"
                                                        >
                                                            <Pencil size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(product._id)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>

                                            {/* Variant rows (only if expanded) */}
                                            {isExpanded &&
                                                product.variants?.map((variant: any, index: number) => (
                                                    <tr key={`${id}-variant-${index}`} className="bg-gray-50 text-sm">
                                                        <td className="px-6 py-2 text-blue-700" colSpan={2}>
                                                            ↳ <strong>{variant.name}</strong>
                                                        </td>
                                                        <td className="py-2">—</td>
                                                        <td className="py-2 text-blue-700">Stock: {variant.stock}</td>
                                                        <td className="py-2">—</td>
                                                        <td className="py-2">—</td>
                                                        <td className="py-2 text-blue-700">₹{variant.price}</td>
                                                        <td className="py-2 text-xs text-right pr-6 text-gray-500">
                                                            SKU: {variant.sku}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <ConfirmModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={confirmDelete}
                />
            </main>
        </div>
    );
}
