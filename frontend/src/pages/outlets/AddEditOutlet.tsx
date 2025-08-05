import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";


const AddEditOutlet = () => {
    const navigate = useNavigate();
    const { outletId } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        manager: "",
        contact: "",
        email: "",
        gstNumber: "",
        openingHours: "",
        status: "Active"
    });

    useEffect(() => {
        if (outletId) {
            // simulate fetching outlet info from DB
            setFormData({
                name: "Checker Cafe - Park Street",
                address: "Park Street, Kolkata",
                manager: "Ravi Mehra",
                contact: "9876543210",
                email: "ravi@checkercafe.com",
                gstNumber: "19ABCDE1234F1Z5",
                openingHours: "10:00 AM - 10:00 PM",
                status: "Active"
            });
        }
    }, [outletId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted: ", formData);
        navigate("/outlets");
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {outletId ? "Edit Outlet" : "Add New Outlet"}
                    </h2>
                </div>

                <form className="grid grid-cols-2 gap-6 max-w-4xl" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-3 border rounded w-full"
                        placeholder="Outlet Name"
                        required
                    />
                    <input
                        type="text"
                        name="manager"
                        value={formData.manager}
                        onChange={handleChange}
                        className="p-3 border rounded w-full"
                        placeholder="Manager Name"
                        required
                    />
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="p-3 border rounded w-full"
                        placeholder="Contact Number"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-3 border rounded w-full"
                        placeholder="Manager Email"
                        required
                    />
                    <input
                        type="text"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        className="p-3 border rounded w-full"
                        placeholder="GST Number"
                        required
                    />
                    <input
                        type="text"
                        name="openingHours"
                        value={formData.openingHours}
                        onChange={handleChange}
                        className="p-3 border rounded w-full"
                        placeholder="Opening Hours (e.g., 10:00 AM - 10:00 PM)"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="col-span-2 p-3 border rounded w-full"
                        placeholder="Outlet Address"
                        required
                    />
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="col-span-2 p-3 border rounded w-full"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <div className="col-span-2 flex justify-end">
                        <Button type="submit" className="w-auto px-6">
                            {outletId ? "Update Outlet" : "Create Outlet"}
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AddEditOutlet;
