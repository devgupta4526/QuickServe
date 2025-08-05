import React from "react";
import { useNavigate } from "react-router-dom";
import {
    ShoppingCart, Utensils, Briefcase, DollarSign,
    FileText, PieChart, CreditCard, Wallet,
    Mail, MessageSquare, BarChart2, Package,
    ShoppingBag, Wrench, CheckSquare, CheckCircle, Circle,
} from "lucide-react";
import { useOnboardingData } from "../../hooks/useOnboardingData";

const MODULE_GROUPS = [
    {
        category: "Sales",
        apps: [
            { id: "pos", label: "Point of Sale", icon: ShoppingCart },
            { id: "restaurant", label: "Restaurant Management", icon: Utensils },
            { id: "crm", label: "CRM", icon: Briefcase },
            { id: "sales", label: "Sales", icon: DollarSign },
        ],
    },
    {
        category: "Finance",
        apps: [
            { id: "invoicing", label: "Invoicing", icon: FileText },
            { id: "accounting", label: "Accounting", icon: PieChart },
            { id: "expenses", label: "Expenses", icon: CreditCard },
            { id: "payroll", label: "Payroll", icon: Wallet },
        ],
    },
    {
        category: "Marketing",
        apps: [
            { id: "email_marketing", label: "Email Marketing", icon: Mail },
            { id: "sms_marketing", label: "SMS Marketing", icon: MessageSquare },
            { id: "survey", label: "Survey", icon: BarChart2 },
        ],
    },
    {
        category: "Operations",
        apps: [
            { id: "inventory", label: "Inventory", icon: Package },
            { id: "purchase", label: "Purchase", icon: ShoppingBag },
            { id: "maintenance", label: "Maintenance", icon: Wrench },
            { id: "quality", label: "Quality", icon: CheckSquare },
        ],
    },
];

const BusinessAppSelection = () => {
    const navigate = useNavigate();
    const { modules, setModules } = useOnboardingData();

    const toggleApp = (id: string) => {
        setModules(modules.includes(id)
            ? modules.filter((mod) => mod !== id)
            : [...modules, id]);
    };

    const handleNext = () => {
        if (modules.length === 0) {
            alert("Please select at least one module.");
            return;
        }
        navigate("/setup/template");
    };

    return (
        <div className="min-h-screen px-6 py-10 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">Select Business Modules</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    {MODULE_GROUPS.map((group) => (
                        <div key={group.category} className="bg-white p-6 rounded-xl shadow">
                            <h2 className="text-lg font-semibold text-orange-600 mb-4">{group.category}</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {group.apps.map((app) => {
                                    const Icon = app.icon;
                                    const selected = modules.includes(app.id);
                                    return (
                                        <div
                                            key={app.id}
                                            onClick={() => toggleApp(app.id)}
                                            className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition ${selected
                                                    ? "bg-orange-100 text-orange-700 border border-orange-500"
                                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                                                }`}
                                        >
                                            {selected ? (
                                                <CheckCircle className="text-orange-600" size={18} />
                                            ) : (
                                                <Circle className="text-gray-400" size={18} />
                                            )}
                                            <Icon size={18} className="text-orange-500" />
                                            {app.label}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <button
                        onClick={handleNext}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-semibold"
                        disabled={modules.length === 0}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusinessAppSelection;
