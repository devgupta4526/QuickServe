import { useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";


interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
    visible: boolean;
}

const initialCategories: Category[] = [
    {
        id: "1",
        name: "Starters",
        icon: "🍤",
        color: "#F87171",
        visible: true,
    },
    {
        id: "2",
        name: "Beverages",
        icon: "🥤",
        color: "#60A5FA",
        visible: true,
    },
];

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [formData, setFormData] = useState({
        name: "",
        icon: "",
        color: "#000000",
        visible: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCategories((prev) => [
            ...prev,
            {
                ...formData,
                id: Date.now().toString(),
            },
        ]);
        setFormData({ name: "", icon: "", color: "#000000", visible: true });
    };

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Categories</h2>

                    <form className="grid grid-cols-2 gap-4 mb-10" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Category Name"
                            required
                            className="border px-4 py-2 rounded"
                        />
                        <input
                            type="text"
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            placeholder="Emoji Icon (e.g. 🍔)"
                            className="border px-4 py-2 rounded"
                        />
                        <input
                            type="color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded"
                        />
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="visible"
                                checked={formData.visible}
                                onChange={handleChange}
                            />
                            Visible
                        </label>
                        <Button type="submit" className="col-span-2 w-fit">
                            + Add Category
                        </Button>
                    </form>

                    <div className="grid grid-cols-3 gap-4">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="p-4 rounded shadow border hover:shadow-md"
                                style={{ backgroundColor: cat.color }}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl">{cat.icon}</span>
                                    <span className="text-sm text-white bg-black/30 px-2 rounded">
                                        {cat.visible ? "Visible" : "Hidden"}
                                    </span>
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-white">
                                    {cat.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Categories;
