import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { getOrdersByOutlet } from "../../lib/api";

const statusColors: Record<string, string> = {
  Placed: "bg-yellow-100 border-yellow-300",
  Preparing: "bg-blue-100 border-blue-300",
  "Out for Delivery": "bg-purple-100 border-purple-300",
  Delivered: "bg-green-100 border-green-300",
};

const KitchenDashboard = () => {
  const navigate = useNavigate();
  const { outletId } = useParams();

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", outletId],
    queryFn: () => getOrdersByOutlet(outletId!),
    enabled: !!outletId,
  });

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Kitchen Dashboard</h2>

        {isLoading ? (
          <p>Loading orders...</p>
        ) : isError ? (
          <p className="text-red-500">Error loading orders</p>
        ) : Array.isArray(orders) && orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className={`p-4 rounded border shadow-sm cursor-pointer ${statusColors[order.status]}`}
                onClick={() =>
                  navigate(`/pos-dashboard/${outletId}/kitchen/orders/${order._id}`)
                }
              >
                <h3 className="text-lg font-semibold text-gray-700">Order #{order._id}</h3>
                <p className="text-sm text-gray-600 mb-2">Table: {order.table || "N/A"}</p>
                <ul className="text-sm list-disc ml-5 text-gray-700">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} x {item.quantity}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm italic text-gray-600 capitalize">
                  Status: {order.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No active orders found.</p>
        )}
      </main>
    </div>
  );
};

export default KitchenDashboard;
