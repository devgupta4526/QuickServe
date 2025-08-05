import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Sidebar from "../../components/ui/Sidebar";
import ConfirmModal from "../../components/ConfirmModal";
import { getCustomers, deleteCustomer } from "../../lib/api";

export default function CustomerList() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const {
        data: customers = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["customers"],
        queryFn: getCustomers,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
            setShowModal(false);
        },
    });

    const handleDelete = (id: string) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Customer Management</h2>
                    <button
                        onClick={() => navigate("/customers/add")}
                        className="bg-orange-500 text-white px-4 py-2 rounded flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Customer
                    </button>
                </div>

                <div className="overflow-auto shadow border border-gray-200 rounded-lg bg-white">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="p-4">Image</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Spent</th>
                                <th>Orders</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={7} className="p-4 text-center">Loading...</td></tr>
                            ) : isError ? (
                                <tr><td colSpan={7} className="p-4 text-center text-red-500">Failed to load customers</td></tr>
                            ) : customers.length === 0 ? (
                                <tr><td colSpan={7} className="p-4 text-center">No customers found</td></tr>
                            ) : (
                                customers.map((cust: any) => (
                                    <tr key={cust._id} className="border-t hover:bg-gray-50">
                                        <td className="p-4">
                                            <img
                                                src={cust.imageUrl || "https://via.placeholder.com/50"}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </td>
                                        <td>{cust.name}</td>
                                        <td>{cust.gender}</td>
                                        <td>${cust.spent}</td>
                                        <td>{cust.orders}</td>
                                        <td>{cust.address}</td>
                                        <td className="flex gap-3 items-center mt-1">
                                            <button
                                                onClick={() => navigate(`/customers/edit/${cust._id}`)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cust._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <ConfirmModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={confirmDelete}
                    title="Delete Customer?"
                    message="Are you sure you want to delete this customer?"
                />
            </main>
        </div>
    );
}
