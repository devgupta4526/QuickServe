import { useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";


const VariantsAndAddons = () => {
    // const { outletId, itemId } = useParams();

    const [variants, setVariants] = useState<string[]>(["Regular", "Large"]);
    const [addons, setAddons] = useState<string[]>(["Ice Cream"]);
    const [variantInput, setVariantInput] = useState("");
    const [addonInput, setAddonInput] = useState("");

    const handleAddVariant = () => {
        if (variantInput.trim()) {
            setVariants([...variants, variantInput.trim()]);
            setVariantInput("");
        }
    };

    const handleAddAddon = () => {
        if (addonInput.trim()) {
            setAddons([...addons, addonInput.trim()]);
            setAddonInput("");
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Customize Variants & Add-ons
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Variants</h3>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={variantInput}
                                onChange={(e) => setVariantInput(e.target.value)}
                                className="border px-3 py-2 rounded w-full"
                                placeholder="e.g., Regular, Large"
                            />
                            <Button onClick={handleAddVariant}>Add</Button>
                        </div>
                        <ul className="list-disc pl-5 text-gray-700">
                            {variants.map((v, i) => (
                                <li key={i}>{v}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Add-ons</h3>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={addonInput}
                                onChange={(e) => setAddonInput(e.target.value)}
                                className="border px-3 py-2 rounded w-full"
                                placeholder="e.g., Cheese, Ice Cream"
                            />
                            <Button onClick={handleAddAddon}>Add</Button>
                        </div>
                        <ul className="list-disc pl-5 text-gray-700">
                            {addons.map((a, i) => (
                                <li key={i}>{a}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VariantsAndAddons;