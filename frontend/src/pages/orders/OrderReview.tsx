
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Button from "../../components/ui/Button";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  addons?: string[];
}

const dummyCart: CartItem[] = [
  {
    id: "1",
    name: "Veg Burger",
    quantity: 2,
    price: 120,
    addons: ["Cheese", "Extra Patty"],
  },
  {
    id: "2",
    name: "Cold Coffee",
    quantity: 1,
    price: 150,
    addons: [],
  },
];

const OrderReview = () => {
  const [cart, setCart] = useState<CartItem[]>(dummyCart);
  const [deliveryType, setDeliveryType] = useState<"dinein" | "takeaway" | "delivery">("dinein");

  const navigate = useNavigate();

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleConfirm = () => {
    navigate("/order-success");
  };

  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ShoppingCart className="w-6 h-6" />
        Review Your Order
      </h2>

      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border rounded p-4 flex justify-between items-start bg-gray-50"
          >
            <div>
              <h4 className="font-medium text-gray-800">{item.name}</h4>
              <p className="text-sm text-gray-600">
                Qty: {item.quantity} × ₹{item.price}
              </p>
              {item.addons && item.addons.length > 0 && (
                <p className="text-xs text-gray-500">
                  Add-ons: {item.addons.join(", ")}
                </p>
              )}
            </div>
            <span className="text-gray-800 font-semibold">
              ₹{item.quantity * item.price}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Choose Delivery Option:
        </label>
        <div className="flex gap-4">
          {["dinein", "takeaway", "delivery"].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="delivery"
                value={type}
                checked={deliveryType === type}
                onChange={() => setDeliveryType(type as any)}
              />
              {type[0].toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center font-semibold text-lg mb-6">
        <span>Total:</span>
        <span>₹{getTotal()}</span>
      </div>

      <Button className="w-full" onClick={handleConfirm}>
        Confirm & Place Order
      </Button>
    </div>
  );
};

export default OrderReview;
