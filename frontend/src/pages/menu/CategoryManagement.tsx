import { useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";


const CategoryManagement = () => {
    const [categories, setCategories] = useState<string[]>(["Starters", "Beverages"]);
    const [newCategory, setNewCategory] = useState("");

    const handleAdd = () => {
        if (newCategory.trim() && !categories.includes(newCategory.trim())) {
            setCategories([...categories, newCategory.trim()]);
            setNewCategory("");
        }
    };

    const handleDelete = (cat: string) => {
        setCategories(categories.filter((c) => c !== cat));
    };

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Categories</h2>

                <div className="flex gap-3 mb-6">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter new category"
                        className="border px-4 py-2 rounded w-64"
                    />
                    <Button onClick={handleAdd}>+ Add</Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((cat) => (
                        <div
                            key={cat}
                            className="border rounded p-4 flex justify-between items-center"
                        >
                            <span className="text-gray-800 font-medium">{cat}</span>
                            <button
                                onClick={() => handleDelete(cat)}
                                className="text-red-600 hover:text-red-800 text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default CategoryManagement;
