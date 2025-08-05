// src/pages/onboarding/ConfirmSetup.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useOnboardingData } from "../../hooks/useOnboardingData";
import { createBusinessWithOutlets } from "../../lib/api";

const ConfirmSetup = () => {
    const navigate = useNavigate();
    const { businessInfo, outlets, modules, templateId } = useOnboardingData();

    const {
        mutate: submitBusiness,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: createBusinessWithOutlets,
        onSuccess: () => {
            navigate("/outlet-selection");
        },
    });

    const handleSubmit = () => {
        if (!businessInfo || !outlets.length) return;

        const businessPayload = {
            name: businessInfo.name,
            type: businessInfo.type,
            gstNumber: businessInfo.gstNumber,
            currency: businessInfo.currency,
            settings: {
                theme: businessInfo.theme,
                modules,
                templateId,
            },
        };

        submitBusiness({ business: businessPayload, outlets });
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Review & Confirm</h2>

                {isError && (
                    <p className="text-red-500 mb-4 text-center">
                        {(error as any)?.response?.data?.message || "Something went wrong"}
                    </p>
                )}

                {businessInfo && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Business Info</h3>
                        <p><strong>Name:</strong> {businessInfo.name}</p>
                        <p><strong>Type:</strong> {businessInfo.type}</p>
                        {businessInfo.gstNumber && <p><strong>GST:</strong> {businessInfo.gstNumber}</p>}
                        <p><strong>Currency:</strong> {businessInfo.currency}</p>
                        <p><strong>Theme:</strong> {businessInfo.theme}</p>
                        <p><strong>Modules:</strong> {modules.join(", ")}</p>
                    </div>
                )}

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Outlets</h3>
                    {outlets.map((outlet, index) => (
                        <div key={index} className="mb-2">
                            <p>
                                <strong>{outlet.outletName}</strong> — {outlet.outletAddress}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-semibold"
                    >
                        {isPending ? "Submitting..." : "Confirm & Finish Setup"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmSetup;
