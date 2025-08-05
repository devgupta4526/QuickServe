import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Sidebar from "../../components/ui/Sidebar";
import ImageUploadModal from "../../components/ImageUploadModal";
import { createCustomer } from "../../lib/api";

const AddCustomer = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        spent: "",
        address: "",
        orders: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploadOpen, setUploadOpen] = useState(false);

    const mutation = useMutation({
        mutationFn: createCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
            navigate("/customers");
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("gender", formData.gender);
        payload.append("spent", formData.spent);
        payload.append("address", formData.address);
        payload.append("orders", formData.orders || "0");
        if (imageFile) payload.append("image", imageFile);

        mutation.mutate(payload);
    };

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Add Customer</h2>
                <div className="bg-white p-6 border rounded-lg max-w-xl">
                    <button
                        onClick={() => setUploadOpen(true)}
                        className="w-full h-40 bg-gray-100 border rounded mb-4 flex items-center justify-center"
                    >
                        {imageFile ? (
                            <img
                                src={URL.createObjectURL(imageFile)}
                                alt="Customer"
                                className="h-full object-cover rounded"
                            />
                        ) : (
                            <span className="text-gray-500">Upload Image</span>
                        )}
                    </button>

                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="input mb-3" />
                    <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" className="input mb-3" />
                    <input name="spent" value={formData.spent} onChange={handleChange} placeholder="Spent ($)" className="input mb-3" />
                    <input name="orders" value={formData.orders} onChange={handleChange} placeholder="Orders" className="input mb-3" />
                    <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input mb-3" />

                    <button
                        onClick={handleSave}
                        disabled={mutation.isPending}
                        className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600"
                    >
                        {mutation.isPending ? "Saving..." : "Save Customer"}
                    </button>
                </div>

                <ImageUploadModal
                    isOpen={isUploadOpen}
                    onClose={() => setUploadOpen(false)}
                    onSelect={(file) => setImageFile(file)}
                />
            </main>
        </div>
    );
};

export default AddCustomer;
