import React, { useState } from "react";
import Button from "./ui/Button";

interface Variant {
    name: string;
    price: number;
}

interface Addon {
    name: string;
    price: number;
}

interface Props {
    name: string;
    basePrice: number;
    imageUrl: string;
    variants?: Variant[];
    addons?: Addon[];
    onAdd: (item: {
        variant?: Variant;
        addons: Addon[];
        totalPrice: number;
    }) => void;
    onClose: () => void;
}

const MenuItemModal: React.FC<Props> = ({
    name,
    basePrice,
    imageUrl,
    variants = [],
    addons = [],
    onAdd,
    onClose,
}) => {
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
    const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

    const toggleAddon = (addon: Addon) => {
        setSelectedAddons((prev) =>
            prev.some((a) => a.name === addon.name)
                ? prev.filter((a) => a.name !== addon.name)
                : [...prev, addon]
        );
    };

    const totalPrice =
        basePrice +
        (selectedVariant?.price || 0) +
        selectedAddons.reduce((sum, a) => sum + a.price, 0);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <button onClick={onClose} className="text-2xl font-bold px-2">×</button>
                </div>

                {/* Image */}
                <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />

                {/* Options */}
                <div className="p-4 flex-1 overflow-y-auto">
                    {variants.length > 0 && (
                        <div className="mb-4">
                            <p className="font-semibold mb-2">Select Variant</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {variants.map((variant) => {
                                    const selected = selectedVariant?.name === variant.name;
                                    return (
                                        <button
                                            key={variant.name}
                                            onClick={() => setSelectedVariant(variant)}
                                            className={`p-3 rounded-lg border text-center font-medium ${selected
                                                    ? "bg-orange-500 text-white border-orange-500"
                                                    : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                                                }`}
                                        >
                                            {variant.name}
                                            <br />
                                            +₹{variant.price}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {addons.length > 0 && (
                        <div className="mb-4">
                            <p className="font-semibold mb-2">Add-ons</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {addons.map((addon) => {
                                    const selected = selectedAddons.some((a) => a.name === addon.name);
                                    return (
                                        <button
                                            key={addon.name}
                                            onClick={() => toggleAddon(addon)}
                                            className={`p-3 rounded-lg border text-center font-medium ${selected
                                                    ? "bg-green-600 text-white border-green-600"
                                                    : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                                                }`}
                                        >
                                            {addon.name}
                                            <br />
                                            +₹{addon.price}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer with Total & Actions */}
                <div className="border-t p-4 flex items-center justify-between">
                    <p className="text-lg font-semibold">
                        Total: ₹{totalPrice.toFixed(2)}
                    </p>
                    <Button
                        className="bg-orange-500 text-white px-6 py-2 text-lg"
                        onClick={() => {
                            onAdd({
                                variant: selectedVariant || undefined,
                                addons: selectedAddons,
                                totalPrice,
                            });
                            onClose();
                        }}
                    >
                        ✅ Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MenuItemModal;
