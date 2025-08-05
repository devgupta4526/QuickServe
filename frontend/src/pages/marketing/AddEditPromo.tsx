import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";


const AddEditPromo = () => {
    const { promoId } = useParams();
    const isEdit = !!promoId;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: isEdit ? "10% Off on Beverages" : "",
        type: isEdit ? "Percentage" : "Percentage",
        value: isEdit ? "10%" : "",
        active: isEdit ? true : true,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Promo Submitted:", formData);
        navigate("/promos");
    };

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {isEdit ? "Edit Promotion" : "Add New Promotion"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium">Promo Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            required
                        >
                            <option value="Percentage">Percentage</option>
                            <option value="Flat">Flat Discount</option>
                            <option value="Freebie">Free Item</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Value</label>
                        <input
                            type="text"
                            name="value"
                            value={formData.value}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="active"
                            checked={formData.active}
                            onChange={handleChange}
                        />
                        <label className="text-sm text-gray-700">Active</label>
                    </div>

                    <Button type="submit">{isEdit ? "Update Promo" : "Create Promo"}</Button>
                </form>
            </main>
        </div>
    );
};

export default AddEditPromo;
