import { Trash2, Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import {
    createOrder,
    getCustomerByPhone,
    getAvailableTables,
    reserveTable,
} from "../../lib/api";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

interface CartItem {
    _id?: string; // Used internally
    id?: string; // Sent to backend
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    variants?: { name: string; price: number }[];
    addons?: { name: string; price: number }[];
}

interface Table {
    _id: string;
    tableNo: string;
    seats: number;
    status: string;
}

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const initialCart = (location.state?.cart || []) as CartItem[];
    const outletId = location.state?.outletId;

    const [cart, setCart] = useState<CartItem[]>(initialCart);
    const [orderType, setOrderType] = useState("dine-in");
    const [selectedTableId, setSelectedTableId] = useState("");
    const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);

    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        phone: "",
        email: "",
        customerId: "",
    });

    const { data: availableTables = [] } = useQuery<Table[]>({
        queryKey: ["tables", outletId],
        queryFn: () => getAvailableTables(outletId),
        enabled: orderType === "dine-in" && !!outletId,
    });

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const tax = 4;
    const charges = 24;
    const total = subtotal + tax + charges;

    const orderMutation = useMutation({
        mutationFn: (payload: any) => createOrder(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders", outletId] });
            localStorage.removeItem("cart");
            navigate(`/dashboard/${outletId}/success`);
        },
        onError: () => {
            alert("❌ Order failed. Please check the data.");
        },
    });

    const handleChange = (field: string, value: string) => {
        setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    };

    const handlePhoneBlur = async () => {
        if (!customerInfo.phone) return;
        try {
            setIsLoadingCustomer(true);
            const customer = await getCustomerByPhone(customerInfo.phone);
            if (customer) {
                setCustomerInfo({
                    name: customer.name || "",
                    phone: customer.phone || "",
                    email: customer.email || "",
                    customerId: customer._id || "",
                });
                alert("✅ Existing customer loaded!");
            }
        } catch (err) {
            console.warn("Customer lookup error:", err);
        } finally {
            setIsLoadingCustomer(false);
        }
    };

    const handleQtyChange = (id: string, delta: number) => {
        setCart((prev) =>
            prev.map((item) =>
                (item._id === id || item.id === id)
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const handleRemove = (id: string) => {
        setCart((prev) => prev.filter((item) => item._id !== id && item.id !== id));
    };

    const handleClearCart = () => {
        if (window.confirm("Are you sure you want to clear the cart?")) {
            setCart([]);
        }
    };

    const handlePlaceOrder = async () => {
        if (!outletId || cart.length === 0) return;

        if (orderType === "dine-in" && !selectedTableId) {
            alert("Please select a table for dine-in orders.");
            return;
        }

        try {
            // Reserve the table if dine-in
            if (orderType === "dine-in") {
                const selectedTable = availableTables.find(
                    (t) => t._id === selectedTableId
                );
                if (!selectedTable) {
                    alert("Selected table not found or already booked.");
                    return;
                }

                await reserveTable(selectedTableId, {
                    name: customerInfo.name || "Walk-in",
                    phone: customerInfo.phone,
                    customerId: customerInfo.customerId || "",
                });
            }

            // 🔁 Transform cart items to have `id` field
            const transformedItems = cart.map((item) => ({
                id: item._id || item.id!, // Ensure `id` exists
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                imageUrl: item.imageUrl,
                variants: item.variants,
                addons: item.addons,
            }));

            const payload = {
                outletId,
                source: "staff",
                orderType,
                table: selectedTableId || undefined,
                items: transformedItems,
                tax,
                charges,
                total,
                customer: {
                    name: customerInfo.name || "Walk-in",
                    phone: customerInfo.phone,
                    email: customerInfo.email,
                    customerId: customerInfo.customerId || undefined,
                },
            };

            orderMutation.mutate(payload);
        } catch (err) {
            alert("Failed to place order or reserve table.");
            console.error(err);
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 p-6 bg-white">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">🧾 Checkout</h2>
                    <Button
                        className="bg-gray-200 text-black hover:bg-gray-300"
                        onClick={() => navigate(`/dashboard/${outletId}`)}
                    >
                        ← Back to Menu
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* PHONE */}
                    <div>
                        <label className="block text-sm font-medium">📞 Phone Number</label>
                        <input
                            className="w-full border rounded-md px-3 py-2 text-sm mt-1"
                            placeholder="Enter Phone"
                            value={customerInfo.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            onBlur={handlePhoneBlur}
                        />
                        {isLoadingCustomer && (
                            <p className="text-xs mt-1">🔄 Looking up customer...</p>
                        )}
                    </div>

                    {/* ORDER TYPE */}
                    <div>
                        <label className="block text-sm font-medium">🍽 Order Type</label>
                        <select
                            className="w-full border rounded-md px-3 py-2 mt-1"
                            value={orderType}
                            onChange={(e) => setOrderType(e.target.value)}
                        >
                            <option value="dine-in">Dine-in</option>
                            <option value="takeaway">Takeaway</option>
                            <option value="delivery">Delivery</option>
                        </select>
                    </div>

                    {/* TABLE SELECT */}
                    {orderType === "dine-in" && (
                        <div>
                            <label className="block text-sm font-medium">🪑 Select Table</label>
                            <select
                                className="w-full border rounded-md px-3 py-2 mt-1"
                                value={selectedTableId}
                                onChange={(e) => setSelectedTableId(e.target.value)}
                            >
                                <option value="">Select</option>
                                {availableTables.map((table) => (
                                    <option key={table._id} value={table._id}>
                                        {table.tableNo} ({table.seats} seats)
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* CUSTOMER INFO */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <h3 className="text-md font-semibold mb-2">👤 Customer Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["name", "email"].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium capitalize">
                                    {field}
                                </label>
                                <input
                                    className="w-full border rounded-md px-3 py-2 text-sm mt-1"
                                    value={customerInfo[field as keyof typeof customerInfo]}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* CART + SUMMARY */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-md font-semibold">🛒 Cart Items</h3>
                            {cart.length > 0 && (
                                <button
                                    onClick={handleClearCart}
                                    className="text-sm text-red-500 hover:underline"
                                >
                                    Clear Cart
                                </button>
                            )}
                        </div>

                        {cart.length === 0 ? (
                            <p className="text-sm text-gray-500">Your cart is empty.</p>
                        ) : (
                            cart.map((item) => (
                                <div
                                    key={item._id || item.id}
                                    className="flex items-center justify-between border rounded-md p-4 shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-14 h-14 rounded object-cover"
                                        />
                                        <div>
                                            <p className="text-sm font-medium">{item.name}</p>
                                            <p className="text-xs text-gray-500">
                                                ₹{item.price.toFixed(2)} × {item.quantity} = ₹
                                                {(item.price * item.quantity).toFixed(2)}
                                            </p>
                                            {item.variants && item.variants?.length > 0 && (
                                                <p className="text-xs text-gray-600">
                                                    Variants: {item.variants.map((v) => v.name).join(", ")}
                                                </p>
                                            )}
                                            {item.addons && item.addons?.length > 0 && (
                                                <p className="text-xs text-gray-600">
                                                    Addons: {item.addons.map((a) => a.name).join(", ")}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Button onClick={() => handleQtyChange(item._id || item.id!, -1)}>
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="text-sm">{item.quantity}</span>
                                        <Button onClick={() => handleQtyChange(item._id || item.id!, 1)}>
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                        <button onClick={() => handleRemove(item._id || item.id!)}>
                                            <Trash2 className="w-5 h-5 text-gray-500 hover:text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="border rounded-md p-6 shadow-md h-fit bg-gray-50">
                        <h3 className="text-md font-semibold mb-4">🧾 Order Summary</h3>
                        <div className="text-sm space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Tax</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Charges</span>
                                <span>₹{charges.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-semibold border-t pt-2">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button
                            className="bg-black hover:bg-gray-800 text-white w-full"
                            onClick={handlePlaceOrder}
                            disabled={orderMutation.isPending || cart.length === 0}
                        >
                            {orderMutation.isPending ? "Placing..." : "✅ Place Order"}
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Checkout;
