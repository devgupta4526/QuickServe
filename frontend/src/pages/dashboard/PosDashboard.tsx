import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "../../components/ui/Sidebar";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button2";
import { getMenuItemsByOutlet } from "../../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import MenuItemModal from "../../components/MenuItemModal";

interface Variant { name: string; price: number }
interface Addon { name: string; price: number }

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  available: boolean;
  variants?: Variant[];
  addons?: Addon[];
}

interface CartEntry {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  variants?: Variant[];
  addons?: Addon[];
}

const PosDashboard = () => {
  const { outletId } = useParams<{ outletId: string }>();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: menu = [], isLoading } = useQuery<MenuItem[]>({
    queryKey: ["menu", outletId],
    queryFn: () => getMenuItemsByOutlet(outletId!),
    enabled: !!outletId,
  });

  const filteredMenu = useMemo(() => {
    return menu.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [menu, searchTerm]);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePlaceOrder = () => {
    navigate(`/pos-dashboard/${outletId}/checkout`, {
      state: { cart, outletId },
    });
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Special Menu</h2>

        <input
          type="text"
          placeholder="Search items..."
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {isLoading ? (
          <p>Loading menu...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredMenu.map((item) => (
              <Card
                key={item._id}
                onClick={() => item.available && setSelectedItem(item)}
                className={`p-4 cursor-pointer transition duration-300 ${!item.available ? "opacity-50 grayscale cursor-not-allowed" : "hover:shadow-lg"
                  }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="rounded-lg h-40 w-full object-cover mb-4"
                />
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                <div className="font-bold text-orange-500">₹{item.price.toFixed(2)}</div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      <aside className="w-96 bg-gray-50 border-l p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          <h3 className="text-lg font-semibold mb-4">🧾 Cart Summary</h3>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-400">🛒 Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-md bg-white border shadow-sm relative"
                >
                  <button
                    onClick={() => handleRemove(idx)}
                    className="absolute top-2 right-2 text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <h4 className="font-semibold text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity} | ₹{item.price.toFixed(2)}
                  </p>
                  {item.variants && item.variants?.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      <strong>Variants:</strong> {item.variants.map(v => v.name).join(", ")}
                    </p>
                  )}
                  {item.addons && item.addons?.length > 0 && (
                    <p className="text-xs text-gray-600">
                      <strong>Addons:</strong> {item.addons.map(a => a.name).join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-sm mt-6 border-t pt-4">
          <p>Subtotal: ₹{getTotal().toFixed(2)}</p>
          <p>Tax: ₹4.00</p>
          <p>Charges: ₹24.00</p>
          <p className="font-semibold text-lg mt-2">
            Total: ₹{(getTotal() + 28).toFixed(2)}
          </p>
          <Button
            onClick={handlePlaceOrder}
            disabled={cart.length === 0}
            className="mt-4 w-full bg-orange-500 text-white"
          >
            Checkout →
          </Button>
        </div>
      </aside>

      {/* Variant/Addons Modal */}
      {selectedItem && (
        <MenuItemModal
          name={selectedItem.name}
          basePrice={selectedItem.price}
          imageUrl={selectedItem.imageUrl}
          variants={selectedItem.variants}
          addons={selectedItem.addons}
          onClose={() => setSelectedItem(null)}
          onAdd={({ variant, addons, totalPrice }) => {
            const cartItem: CartEntry = {
              _id: selectedItem._id,
              name: selectedItem.name,
              imageUrl: selectedItem.imageUrl,
              price: totalPrice,
              quantity: 1,
              variants: variant ? [variant] : [],
              addons,
            };
            setCart((prev) => [...prev, cartItem]);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
};

export default PosDashboard;
