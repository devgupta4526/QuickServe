import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrderById, updateOrderStatus } from "../../lib/api";

const OrderDetailsKitchen = () => {
    const { orderId, outletId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        data: order,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["order", orderId],
        queryFn: () => getOrderById(orderId!),
        enabled: !!orderId,
    });

    const { mutate: updateStatus, isPending } = useMutation({
        mutationFn: ({ status }: { status: string }) =>
            updateOrderStatus({ orderId: orderId!, status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["order", orderId] });
        },
    });

    const handleStatusUpdate = () => {
        if (!order) return;
        const nextStatus =
            order.status === "Placed"
                ? "Preparing"
                : order.status === "Preparing"
                    ? "Out for Delivery"
                    : order.status === "Out for Delivery"
                        ? "Delivered"
                        : "Delivered";

        updateStatus(
            { status: nextStatus },
            {
                onSuccess: () => {
                    alert(`Status updated to ${nextStatus}`);
                    if (nextStatus === "Delivered") {
                        navigate(`/pos-dashboard/${outletId}/kitchen`);
                    }
                },
            }
        );
    };

    if (isLoading) return <div className="p-8">Loading order...</div>;
    if (isError || !order) return <div className="p-8">Order not found.</div>;

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-8 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order #{order._id}</h2>
                <p className="text-gray-600 mb-2">Table: {order.table || "N/A"}</p>
                <div className="bg-gray-50 border rounded p-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Items:</h3>
                    <ul className="list-disc ml-6 text-sm text-gray-800">
                        {order.items.map((item, idx) => (
                            <li key={idx}>
                                {item.name} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="mb-4 text-gray-700">
                    Status: <span className="font-semibold">{order.status}</span>
                </p>
                {order.status !== "Delivered" && (
                    <Button onClick={handleStatusUpdate} disabled={isPending}>
                        {order.status === "Placed" && "Start Preparation"}
                        {order.status === "Preparing" && "Mark as Out for Delivery"}
                        {order.status === "Out for Delivery" && "Mark as Delivered"}
                    </Button>
                )}
            </main>
        </div>
    );
};

export default OrderDetailsKitchen;
