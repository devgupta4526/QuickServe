import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BusinessInfo, useOnboardingData } from "../../hooks/useOnboardingData";

const BusinessInfoForm = () => {
    const navigate = useNavigate();
    const { templateId, setBusinessInfo } = useOnboardingData();

   const [formData, setFormData] = useState<BusinessInfo>({
        name: "",
        type: "restaurant",
        gstNumber: "",
        currency: "INR",
        theme: "light",
    });

    useEffect(() => {
        if (templateId === "retail_store") {
            setFormData((prev) => ({ ...prev, type: "retail" }));
        } else if (templateId === "vendor_generic") {
            setFormData((prev) => ({ ...prev, type: "vendor" }));
        }
    }, [templateId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        setBusinessInfo(formData);
        navigate("/setup/outlets");
    };

    return (
        <div className="min-h-screen px-6 py-10 bg-gray-50">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Business Information</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Business Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Business Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="restaurant">Restaurant</option>
                            <option value="retail">Retail</option>
                            <option value="vendor">Vendor</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">GST Number (optional)</label>
                        <input
                            type="text"
                            name="gstNumber"
                            value={formData.gstNumber}
                            onChange={handleChange}
                            placeholder="22AAAAA0000A1Z5"
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Currency</label>
                        <input
                            type="text"
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            maxLength={3}
                            className="w-full border px-3 py-2 rounded uppercase"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Theme</label>
                        <select
                            name="theme"
                            value={formData.theme}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={handleNext}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-semibold"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusinessInfoForm;
