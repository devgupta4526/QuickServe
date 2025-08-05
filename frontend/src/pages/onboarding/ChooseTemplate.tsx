import React from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingData } from "../../hooks/useOnboardingData";

const BUSINESS_TEMPLATES = [
    {
        id: "restaurant_basic",
        title: "Restaurant",
        description: "Perfect for dine-in, takeaway, and delivery restaurants.",
        icon: "🍽️",
    },
    {
        id: "retail_store",
        title: "Retail Store",
        description: "Best for grocery shops, clothing, and electronics.",
        icon: "🛒",
    },
    {
        id: "vendor_generic",
        title: "Vendor",
        description: "For suppliers and vendors managing inventory and orders.",
        icon: "📦",
    },
];

const ChooseTemplate = () => {
    const navigate = useNavigate();
    const { setTemplateId } = useOnboardingData();

    const handleSelect = (templateId: string) => {
        setTemplateId(templateId);
        navigate("/setup/business-info");
    };

    return (
        <div className="min-h-screen px-6 py-10 bg-gray-50">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Choose a Business Template</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {BUSINESS_TEMPLATES.map((template) => (
                        <div
                            key={template.id}
                            onClick={() => handleSelect(template.id)}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                        >
                            <div className="text-5xl mb-2">{template.icon}</div>
                            <h3 className="text-xl font-semibold mb-1">{template.title}</h3>
                            <p className="text-gray-500 text-sm">{template.description}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-10">
                    <button
                        onClick={() => navigate("/setup/business-info")}
                        className="text-orange-600 underline"
                    >
                        Skip and setup manually
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChooseTemplate;
