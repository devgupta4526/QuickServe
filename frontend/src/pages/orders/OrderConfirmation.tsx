import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
            <FiCheckCircle className="w-20 h-20 text-green-500 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6 text-center max-w-sm">
                Your order has been successfully placed. You can track your order in real-time.
            </p>
            <Link
                to="/track-order"
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            >
                Track My Order
            </Link>
        </div>
    );
};

export default OrderConfirmation;
