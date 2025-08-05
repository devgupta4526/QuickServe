// src/pages/menu/AddEditProduct.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Camera } from "lucide-react";

import Sidebar from "../../components/ui/Sidebar";
import {
    createProduct,
    updateProduct,
    getProductById,
    getMenuItemsByOutlet,
} from "../../lib/api";
import ImageUploader from "../../components/ui/ImageUploader";

interface VariantField {
    name: string;
    price: string;
    stock: string;
    sku?: string;
}
interface ProductType {
    name: string;
    menuItemId: string;
    unit: string;
    quantity: number;
    threshold?: number;
    category?: string;
    imageUrl?: string;
    variants?: VariantField[];
}

const AddEditProduct = () => {
    const navigate = useNavigate();
    const { productId, outletId } = useParams<{ productId?: string; outletId: string }>();
    console.log("outletId param:", outletId);
    const isEdit = Boolean(productId);

    const [formData, setFormData] = useState({
        name: "",
        menuItemId: "",
        unit: "",
        quantity: "",
        threshold: "",
        category: "",
        image: null as File | null,
    });

    const [variants, setVariants] = useState<VariantField[]>([
        { name: "", price: "", stock: "", sku: "" },
    ]);

    const [previewImage, setPreviewImage] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState("");

    const { data: productData, isLoading: isProductLoading } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId!),
        enabled: isEdit,
        select: (res: any) => res.data as ProductType,
    });

    const { data: menuList } = useQuery({
        queryKey: ["menuItems", outletId],
        queryFn: () => getMenuItemsByOutlet(outletId!),
        enabled: Boolean(outletId),
    });
    console.log("Fetched menuList:", menuList);

    useEffect(() => {
        if (productData && isEdit) {
            setFormData({
                name: productData.name,
                menuItemId: productData.menuItemId,
                unit: productData.unit,
                quantity: productData.quantity.toString(),
                threshold: productData.threshold?.toString() || "",
                category: productData.category || "",
                image: null,
            });
            setVariants(productData.variants || []);
            setPreviewImage(productData.imageUrl || "");
        }
    }, [productData, isEdit]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (file: File | null) => {
        setFormData((prev) => ({ ...prev, image: file }));
        setPreviewImage(file ? URL.createObjectURL(file) : "");
    };

    const handleVariantChange = (i: number, key: keyof VariantField, val: string) => {
        const updated = [...variants];
        updated[i][key] = val;
        setVariants(updated);
    };

    const addVariant = () =>
        setVariants([...variants, { name: "", price: "", stock: "", sku: "" }]);

    const { mutate, isPending } = useMutation({
        mutationFn: (data: FormData) =>
            isEdit ? updateProduct(productId!, data) : createProduct(data),
        onSuccess: () => navigate(`/products/${outletId}`),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = new FormData();
        Object.entries(formData).forEach(([k, v]) => {
            if (v !== null && v !== "") payload.append(k, v);
        });
        if (outletId) payload.append("outletId", outletId);
        payload.append("variants", JSON.stringify(variants));
        mutate(payload);
    };

    const filteredMenuItems =
        searchQuery === ""
            ? menuList
            : menuList?.filter((item: any) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

    const selectedMenuItem = menuList?.find(
        (mi: any) => mi._id === formData.menuItemId
    );

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    {isEdit ? "Edit Product" : "Add Product"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center">
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded"
                            />
                        ) : (
                            <div className="w-32 h-32 bg-gray-100 border rounded flex items-center justify-center">
                                <Camera className="w-6 h-6 text-gray-500" />
                            </div>
                        )}
                    </div>

                    <ImageUploader
                        label="Product Image"
                        name="image"
                        onChange={handleImageChange}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Product Name"
                            className="border p-2 rounded"
                        />

                        {/* Autocomplete Menu Picker */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select Menu Item
                            </label>
                            <select
                                name="menuItemId"
                                value={formData.menuItemId}
                                onChange={handleChange}
                                className="border p-2 rounded"
                            >
                                <option value="">Select Menu Item</option>
                                {Array.isArray(menuList) &&
                                    menuList.map((mi: any) => (
                                        <option key={mi._id} value={mi._id}>
                                            {mi.name} — {mi._id}
                                        </option>
                                    ))}
                            </select>

                        </div>

                        <input
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            placeholder="Unit"
                            className="border p-2 rounded"
                        />
                        <input
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Quantity"
                            className="border p-2 rounded"
                        />
                        <input
                            name="threshold"
                            value={formData.threshold}
                            onChange={handleChange}
                            placeholder="Threshold"
                            className="border p-2 rounded"
                        />
                        <input
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Category"
                            className="border p-2 rounded"
                        />
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Variants</h4>
                        {variants.map((v, i) => (
                            <div key={i} className="grid grid-cols-4 gap-2 mb-2">
                                <input
                                    value={v.name}
                                    onChange={(e) => handleVariantChange(i, "name", e.target.value)}
                                    placeholder="Variant Name"
                                    className="border p-2 rounded"
                                />
                                <input
                                    value={v.price}
                                    onChange={(e) => handleVariantChange(i, "price", e.target.value)}
                                    placeholder="Price"
                                    className="border p-2 rounded"
                                />
                                <input
                                    value={v.stock}
                                    onChange={(e) => handleVariantChange(i, "stock", e.target.value)}
                                    placeholder="Stock"
                                    className="border p-2 rounded"
                                />
                                <input
                                    value={v.sku}
                                    onChange={(e) => handleVariantChange(i, "sku", e.target.value)}
                                    placeholder="SKU"
                                    className="border p-2 rounded"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addVariant}
                            className="text-blue-600 text-sm mt-2"
                        >
                            + Add Variant
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
                    >
                        {isPending
                            ? isEdit
                                ? "Updating..."
                                : "Creating..."
                            : isEdit
                                ? "Update Product"
                                : "Create Product"}
                    </button>
                </form>
            </main>
        </div>
    );
};

export default AddEditProduct;
