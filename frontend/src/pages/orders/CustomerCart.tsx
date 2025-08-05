
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Button from "../../components/ui/Button";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    notes?: string;
}

const initialCart: CartItem[] = [
    {
        id: "1",
        name: "Veg Burger",
        price: 120,
        quantity: 2,
        image: "https://source.unsplash.com/100x100/?burger",
    },
    {
        id: "2",
        name: "Cold Coffee",
        price: 150,
        quantity: 1,
        image: "https://source.unsplash.com/100x100/?coffee",
    },
];

const CustomerCart = () => {
    const [cart, setCart] = useState<CartItem[]>(initialCart);
    const navigate = useNavigate();

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev =>
            prev
                .map(item => item.id === id ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item)
        );
    };

    const removeItem = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const handleProceed = () => {
        navigate("/order-review");
    };

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Your Cart
            </h2>

            {cart.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <div className="max-w-4xl mx-auto space-y-6">
                    {cart.map(item => (
                        <div key={item.id} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                <p className="text-sm text-gray-600">₹{item.price}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 bg-gray-100 rounded hover:bg-gray-200">
                                        <FaMinus size={12} />
                                    </button>
                                    <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 bg-gray-100 rounded hover:bg-gray-200">
                                        <FaPlus size={12} />
                                    </button>
                                </div>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                                <FaTrash />
                            </button>
                        </div>
                    ))}

                    <div className="flex justify-between items-center mt-6">
                        <span className="text-lg font-bold text-gray-700">Total: ₹{totalAmount}</span>
                        <Button onClick={handleProceed}>Proceed to Review</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerCart;
