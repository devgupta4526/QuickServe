// src/pages/onboarding/OutletSetup.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingData } from "../../hooks/useOnboardingData";

const OutletSetup = () => {
    const navigate = useNavigate();
    const { outlets, setOutlets } = useOnboardingData();

    const handleChange = (
        index: number,
        field: "outletName" | "outletAddress" | "phone",
        value: string
    ) => {
        const updated = [...outlets];
        updated[index][field] = value;
        setOutlets(updated);
    };

    const handleAddOutlet = () => {
        setOutlets([...outlets, { outletName: "", outletAddress: "" }]);
    };

    const handleRemoveOutlet = (index: number) => {
        if (outlets.length > 1) {
            setOutlets(outlets.filter((_, i) => i !== index));
        }
    };

    const handleNext = () => {
        navigate("/setup/confirm");
    };

    return (
        <div className="min-h-screen px-6 py-10 bg-gray-50">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Outlet Setup</h2>

                {outlets.map((outlet, index) => (
                    <div key={index} className="mb-4 border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">Outlet Name</label>
                            <input
                                type="text"
                                value={outlet.outletName}
                                onChange={(e) => handleChange(index, "outletName", e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">Outlet Address</label>
                            <input
                                type="text"
                                value={outlet.outletAddress}
                                onChange={(e) => handleChange(index, "outletAddress", e.target.value)}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        {outlets.length > 1 && (
                            <button
                                onClick={() => handleRemoveOutlet(index)}
                                className="text-red-600 text-sm mt-1"
                            >
                                Remove Outlet
                            </button>
                        )}
                    </div>
                ))}

                <div className="mb-6">
                    <button onClick={handleAddOutlet} className="text-orange-600 font-medium">
                        + Add Another Outlet
                    </button>
                </div>

                <div className="text-center">
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

export default OutletSetup;
