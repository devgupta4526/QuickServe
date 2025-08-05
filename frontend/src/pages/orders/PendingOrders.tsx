import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Sidebar from "../../components/ui/Sidebar";
import {
    getOrdersByOutlet,
    updateOrderDetails,
    initiatePayment,
    verifyPayment,
} from "../../lib/api";
import { useParams } from "react-router-dom";
import InvoiceModal from "../../components/InvoiceModal";

type OrderType = "All" | "Dine-in" | "Takeaway" | "Delivery";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PendingOrders() {
    const { outletId } = useParams();
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterType, setFilterType] = useState<OrderType>("All");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [showCompleted, setShowCompleted] = useState(false);

    const queryClient = useQueryClient();

    const {
        data: orders = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["orders", outletId],
        queryFn: () => getOrdersByOutlet(outletId!),
        enabled: !!outletId,
    });

    const getOrderType = (order: any): OrderType => {
        if (order.table) return "Dine-in";
        if (!order.table && order.customer?.address) return "Delivery";
        return "Takeaway";
    };

    // Sort oldest first (by createdAt)
    const sortedOrders = [...orders].sort(
        (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const pendingOrders = sortedOrders
        .filter((order: any) => order.paymentStatus !== "Paid")
        .filter((order: any) => {
            const type = getOrderType(order);
            return filterType === "All" || type === filterType;
        });

    const completedOrders = sortedOrders
        .filter((order: any) => order.paymentStatus === "Paid")
        .filter((order: any) => {
            const type = getOrderType(order);
            return filterType === "All" || type === filterType;
        });

    const visibleOrders = showCompleted ? completedOrders : pendingOrders;

    useEffect(() => {
        if (visibleOrders.length > 0 && !selectedOrder) {
            setSelectedOrder(visibleOrders[0]);
        }
    }, [visibleOrders]);

    const markAsPaidMutation = useMutation({
        mutationFn: async () =>
            updateOrderDetails(selectedOrder._id, {
                paymentStatus: "Paid",
                paymentMethod,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders", outletId] });
            alert("Order marked as paid.");
            setSelectedOrder(null);
        },
        onError: (err: any) => {
            console.error(err);
            alert("Error updating payment.");
        },
    });

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleRazorpayPayment = async () => {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            alert("Failed to load Razorpay. Please check your connection.");
            return;
        }

        try {
            const { key, orderId, amount, currency } = await initiatePayment(selectedOrder._id);

            const rzp = new window.Razorpay({
                key,
                amount,
                currency,
                name: "Restaurant Payment",
                description: `Order #${selectedOrder._id.slice(-5)}`,
                order_id: orderId,
                handler: async (response: any) => {
                    try {
                        await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        queryClient.invalidateQueries({ queryKey: ["orders", outletId] });
                        alert("Payment successful!");
                        setSelectedOrder(null);
                    } catch (err) {
                        console.error(err);
                        alert("Payment verification failed.");
                    }
                },
                prefill: {
                    name: selectedOrder.customer?.name ?? "Guest",
                    email: selectedOrder.customer?.email ?? "guest@example.com",
                    contact: selectedOrder.customer?.phone ?? "",
                },
                theme: {
                    color: "#f97316",
                },
            });

            rzp.open();
        } catch (err) {
            console.error(err);
            alert("Failed to initiate Razorpay payment.");
        }
    };

    const handleMarkAsPaid = () => {
        if (!selectedOrder) return;
        if (paymentMethod === "InApp") {
            handleRazorpayPayment();
        } else {
            markAsPaidMutation.mutate();
        }
    };

    if (isLoading) return <div className="p-6">Loading orders...</div>;
    if (isError) {
        console.error("Error loading orders:", error);
        return <div className="p-6 text-red-500">Failed to load orders.</div>;
    }

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Orders</h2>

                {/* Tabs */}
                <div className="flex gap-4 mb-4">
                    <button
                        onClick={() => setShowCompleted(false)}
                        className={`px-4 py-2 rounded border font-medium ${!showCompleted
                            ? "bg-orange-500 text-white"
                            : "bg-white text-gray-700"
                            }`}
                    >
                        Pending Orders
                    </button>
                    <button
                        onClick={() => setShowCompleted(true)}
                        className={`px-4 py-2 rounded border font-medium ${showCompleted
                            ? "bg-orange-500 text-white"
                            : "bg-white text-gray-700"
                            }`}
                    >
                        Completed Orders
                    </button>
                </div>

                {/* Order Type Filter */}
                <div className="mb-4 flex gap-2">
                    {["All", "Dine-in", "Takeaway", "Delivery"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type as OrderType)}
                            className={`px-4 py-2 rounded border ${filterType === type
                                ? "bg-orange-500 text-white"
                                : "bg-white text-gray-700"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="flex gap-6">
                    {/* Order List */}
                    <div className="w-1/3 space-y-4">
                        <h3 className="text-sm font-medium text-gray-500">
                            {showCompleted ? "Completed Orders" : "Pending Orders"}
                        </h3>
                        {visibleOrders.length === 0 ? (
                            <p className="text-sm text-gray-500">
                                No {showCompleted ? "completed" : "pending"} orders found.
                            </p>
                        ) : (
                            visibleOrders.map((order: any, index: number) => (
                                <div
                                    key={order._id}
                                    onClick={() => setSelectedOrder(order)}
                                    className={`rounded-lg p-4 border cursor-pointer ${selectedOrder?._id === order._id
                                        ? "bg-orange-500 text-white"
                                        : "bg-gray-50"
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">
                                            Order #{order._id.slice(-5)}
                                        </span>
                                        <span
                                            className={`text-sm font-medium ${order.paymentStatus === "Paid"
                                                ? "text-green-500"
                                                : "text-red-500"
                                                }`}
                                        >
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                    <p className="text-sm mt-1">
                                        Table: {order.table ?? "—"} &nbsp; Guest:{" "}
                                        {order.customer?.name ?? "—"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Type: {getOrderType(order)}
                                    </p>
                                    <p className="text-xs text-gray-400">Queue #: {index + 1}</p>
                                    <p className="text-right text-sm font-bold">
                                        ₹{order.total?.toFixed(2)}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Order Details */}
                    <div className="flex-1 border rounded-lg p-6">
                        {selectedOrder ? (
                            <>
                                <div className="flex justify-between mb-4">
                                    <h3 className="font-bold text-lg text-gray-800">
                                        Order #{selectedOrder._id.slice(-5)}
                                    </h3>
                                    <span className="text-sm font-medium text-green-500">
                                        {selectedOrder.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                                    <div>
                                        <p className="font-semibold">Table No</p>
                                        <p>{selectedOrder.table ?? "—"}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Customer</p>
                                        <p className="font-medium text-black">
                                            {selectedOrder.customer?.name ?? "Walk-in"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Payment</p>
                                        <p>{selectedOrder.paymentStatus ?? "Pending"}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Order Type</p>
                                        <p>{getOrderType(selectedOrder)}</p>
                                    </div>
                                </div>

                                <h4 className="font-semibold mb-2 text-gray-800">Items</h4>
                                <div className="space-y-3 mb-4">
                                    {selectedOrder.items?.map((item: any) => (
                                        <div
                                            key={item.id}
                                            className="p-3 border rounded-md bg-gray-50"
                                        >
                                            <div className="flex justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {item.name} × {item.quantity}
                                                    </p>
                                                    {item.notes && (
                                                        <p className="text-xs text-gray-500">
                                                            Notes: {item.notes}
                                                        </p>
                                                    )}
                                                    {item.variants?.length > 0 && (
                                                        <p className="text-xs text-gray-500">
                                                            Variants:{" "}
                                                            {item.variants.map((v: any) => v.name).join(", ")}
                                                        </p>
                                                    )}
                                                    {item.addons?.length > 0 && (
                                                        <p className="text-xs text-gray-500">
                                                            Addons:{" "}
                                                            {item.addons.map((a: any) => a.name).join(", ")}
                                                        </p>
                                                    )}
                                                </div>
                                                <p className="text-orange-500 font-semibold">
                                                    ₹{(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-4 text-sm text-gray-700 mb-4">
                                    <div className="flex justify-between mb-1">
                                        <span>Subtotal</span>
                                        <span>₹{selectedOrder.total?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-1">
                                        <span>Tax</span>
                                        <span>₹{(selectedOrder.tax ?? 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-1">
                                        <span>Charges</span>
                                        <span>₹{(selectedOrder.charges ?? 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>
                                            ₹
                                            {(
                                                (selectedOrder.total ?? 0) +
                                                (selectedOrder.tax ?? 0) +
                                                (selectedOrder.charges ?? 0)
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {selectedOrder.paymentStatus !== "Paid" && (
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Payment Method
                                        </label>
                                        <select
                                            className="w-full border rounded p-2 mb-2"
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                            <option value="Cash">Cash</option>
                                            <option value="UPI">UPI</option>
                                            <option value="Card">Card</option>
                                            <option value="InApp">Razorpay</option>
                                        </select>

                                        <button
                                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
                                            onClick={handleMarkAsPaid}
                                            disabled={markAsPaidMutation.isPending}
                                        >
                                            {markAsPaidMutation.isPending
                                                ? "Processing..."
                                                : paymentMethod === "InApp"
                                                    ? "Pay with Razorpay"
                                                    : "Mark as Paid"}
                                        </button>
                                    </div>
                                )}

                                <button
                                    className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 font-semibold mt-4"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Print Invoice
                                </button>
                            </>
                        ) : (
                            <p>No order selected.</p>
                        )}
                    </div>
                </div>
            </main>

            <InvoiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedOrder={selectedOrder}
            />
        </div>
    );
}
