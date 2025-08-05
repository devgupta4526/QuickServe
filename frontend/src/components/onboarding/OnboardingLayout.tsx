import React from "react";
import SlideIndicator  from "../ui/SlideIndicator";
import { BUSINESS_STRINGS } from "../../constants/businessStrings";

const steps = ["Business Info", "Outlet Details", "Settings", "Review"];

const OnboardingLayout = ({
    step,
    children,
    onBack,
    onNext,
    onSubmit,
    loading,
}: {
    step: number;
    children: React.ReactNode;
    onBack: () => void;
    onNext: () => void;
    onSubmit: () => void;
    loading : boolean
}) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
                <h2 className="text-xl font-bold text-gray-700 mb-8">Setup Wizard</h2>
                <ul className="space-y-4">
                    {steps.map((label, index) => (
                        <li
                            key={label}
                            className={`text-sm font-medium ${step === index ? "text-blue-600" : "text-gray-500"
                                }`}
                        >
                            {index + 1}. {label}
                        </li>
                    ))}
                </ul>
                <div className="mt-10">
                    <SlideIndicator current={step} total={steps.length} />
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 p-8 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">{steps[step]}</h2>
                    <div className="bg-white p-6 rounded-xl shadow space-y-6">
                        {children}
                        <div className="flex justify-between pt-6 border-t">
                            <button
                                onClick={onBack}
                                disabled={step === 0}
                                className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded disabled:opacity-50"
                            >
                                Back
                            </button>
                            {step < steps.length - 1 ? (
                                <button
                                    onClick={onNext}
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={onSubmit}
                                    className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OnboardingLayout;
