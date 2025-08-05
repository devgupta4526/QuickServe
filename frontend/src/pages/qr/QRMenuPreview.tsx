import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMenuItemsByOutlet } from "../../lib/api";

interface MenuItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
    category: string;
    available: boolean;
}

interface CartItem extends MenuItem {
    quantity: number;
}

interface CategoryGroup {
    category: string;
    items: MenuItem[];
}

const QRMenuPreview = () => {
    const { outletId } = useParams();
    const [cart, setCart] = useState<CartItem[]>([]);

    const {
        data: menuByCategory = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["menu-preview", outletId],
        queryFn: async () => {
            const response = await getMenuItemsByOutlet(outletId!);
            const rawItems = response|| [];

            const formatted: MenuItem[] = rawItems.map((item: any) => ({
                id: item._id,
                name: item.name,
                description: item.description,
                price: item.price,
                image: item.imageUrl || "",
                category: item.category,
                available: item.available,
            }));

            const grouped = formatted.reduce((acc: CategoryGroup[], item) => {
                const found = acc.find((group) => group.category === item.category);
                if (found) {
                    found.items.push(item);
                } else {
                    acc.push({ category: item.category, items: [item] });
                }
                return acc;
            }, []);

            return grouped;
        },
        enabled: !!outletId,
    });

    const addToCart = (item: MenuItem) => {
        setCart((prev) => {
            const exists = prev.find((i) => i.id === item.id);
            if (exists) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const updateQuantity = (id: string, qty: number) => {
        if (qty <= 0) {
            setCart((prev) => prev.filter((i) => i.id !== id));
        } else {
            setCart((prev) =>
                prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
            );
        }
    };

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white p-4 md:p-8 pb-28 relative">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                Welcome to QuickServe
            </h2>
            <p className="text-center text-sm text-gray-600 mb-8">
                Scanning menu for outlet{" "}
                <span className="font-medium">{outletId}</span>
            </p>

            {isLoading ? (
                <div className="text-center text-gray-500">Loading menu...</div>
            ) : isError ? (
                <div className="text-center text-red-500">
                    {(error as any)?.message || "Failed to fetch menu"}
                </div>
            ) : menuByCategory.length === 0 ? (
                <div className="text-center text-gray-400">No items found.</div>
            ) : (
                menuByCategory.map((group) => (
                    <div key={group.category} className="mb-12">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">
                            {group.category}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {group.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between"
                                >
                                    <img
                                        src={item.image || "https://via.placeholder.com/150"}
                                        alt={item.name}
                                        className="w-full h-40 object-cover rounded-lg mb-3"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-lg text-gray-800">
                                            {item.name}
                                        </h4>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="font-semibold text-indigo-600">
                                            ₹{item.price}
                                        </span>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
                                        >
                                            Add +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}

            {cart.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-4 shadow-xl z-50">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div className="flex flex-wrap gap-3 text-sm">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-gray-100 px-3 py-1 rounded flex items-center gap-2"
                                >
                                    <span>{item.name}</span>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min={1}
                                        className="w-12 text-center border rounded"
                                        onChange={(e) =>
                                            updateQuantity(item.id, parseInt(e.target.value))
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="text-right">
                            <p className="font-medium text-gray-700">
                                Total: ₹{totalAmount}
                            </p>
                            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-1 transition">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QRMenuPreview;
