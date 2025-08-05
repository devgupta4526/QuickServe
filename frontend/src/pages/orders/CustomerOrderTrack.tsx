// src/pages/CustomerOrderTrack.tsx
import { useState, useEffect } from "react";

const orderStages = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];

const CustomerOrderTrack = () => {
    const [currentStage, setCurrentStage] = useState(0);

    useEffect(() => {
        // Simulate order progress (just for demo)
        const interval = setInterval(() => {
            setCurrentStage((prev) => (prev < orderStages.length - 1 ? prev + 1 : prev));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Track Your Order</h2>

            <div className="w-full max-w-md space-y-4">
                {orderStages.map((stage, index) => (
                    <div key={stage} className="flex items-center">
                        <div
                            className={`h-4 w-4 rounded-full mr-4 ${
                                index <= currentStage ? "bg-green-500" : "bg-gray-300"
                            }`}
                        ></div>
                        <span
                            className={`${
                                index <= currentStage
                                    ? "text-green-600 font-medium"
                                    : "text-gray-500"
                            }`}
                        >
                            {stage}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerOrderTrack;
