// src/pages/pos/OrderSuccess.tsx

import Sidebar from "../../components/ui/Sidebar";




const OrderSuccess = () => {
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <div className="flex flex-col items-center justify-center flex-1 text-center px-6">
                <img
                    src="/images/order_success.svg"
                    alt="Order Success"
                    className="max-w-md mb-6"
                />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Your Order Placed Successfully!
                </h1>
                <p className="text-gray-500 text-sm">
                    Please wait 10-15 minutes for your order.
                </p>
            </div>
        </div>
    );
};

export default OrderSuccess;
