// Updated imports remain unchanged
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createMenuItem,
  updateMenuItem,
  getMenuItemById,
} from "../../lib/api";

type Variant = { name: string; price: string };
type Addon = { name: string; price: string };

const AddEditMenuItem = () => {
  const navigate = useNavigate();
  const { outletId, itemId } = useParams<{ outletId: string; itemId?: string }>();
  const isEdit = Boolean(itemId && itemId !== "add");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    available: true,
    image: null as File | null,
  });

  const [variants, setVariants] = useState<Variant[]>([{ name: "", price: "" }]);
  const [addons, setAddons] = useState<Addon[]>([{ name: "", price: "" }]);

  const { data: itemData, isLoading } = useQuery({
    queryKey: ["menuItem", itemId],
    queryFn: () => getMenuItemById(itemId!),
    enabled: isEdit,
  });

  useEffect(() => {
    if (itemData && isEdit) {
      setFormData({
        name: itemData.name || "",
        description: itemData.description || "",
        price: itemData.price?.toString() || "",
        category: itemData.category || "",
        available: itemData.available ?? true,
        image: null,
      });

      setVariants(itemData.variants?.length ? itemData.variants.map((v: any) => ({
        name: v.name,
        price: v.price.toString(),
      })) : [{ name: "", price: "" }]);

      setAddons(itemData.addons?.length ? itemData.addons.map((a: any) => ({
        name: a.name,
        price: a.price.toString(),
      })) : [{ name: "", price: "" }]);
    }
  }, [itemData, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const handleVariantChange = (index: number, field: keyof Variant, value: string) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleAddonChange = (index: number, field: keyof Addon, value: string) => {
    const updated = [...addons];
    updated[index][field] = value;
    setAddons(updated);
  };

  const addField = (type: "variant" | "addon") => {
    if (type === "variant") setVariants([...variants, { name: "", price: "" }]);
    else setAddons([...addons, { name: "", price: "" }]);
  };

  const removeField = (type: "variant" | "addon", index: number) => {
    if (type === "variant") {
      const list = [...variants];
      list.splice(index, 1);
      setVariants(list);
    } else {
      const list = [...addons];
      list.splice(index, 1);
      setAddons(list);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) =>
      isEdit ? updateMenuItem(itemId!, data) : createMenuItem(data),
    onSuccess: () => navigate(`/outlets/${outletId}/menu`),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submission = {
      ...formData,
      price: Number(formData.price),
      available: Boolean(formData.available),
      variants: variants.filter(v => v.name && v.price),
      addons: addons.filter(a => a.name && a.price),
      outletId: outletId!,
    };

    mutate(submission);
  };

  if (isEdit && isLoading) return <div className="p-6">Loading item data...</div>;

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{isEdit ? "Edit" : "Add New"} Menu Item</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={handleChange} required className="w-full border px-4 py-2 rounded" placeholder="Item Name" />
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border px-4 py-2 rounded" placeholder="Item Description" />
            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full border px-4 py-2 rounded" placeholder="Base Price" />
            <select name="category" value={formData.category} onChange={handleChange} required className="w-full border px-4 py-2 rounded">
              <option value="">Select Category</option>
              <option value="Starters">Starters</option>
              <option value="Main Course">Main Course</option>
              <option value="Beverages">Beverages</option>
              <option value="Desserts">Desserts</option>
            </select>
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full" />
            <label className="flex items-center gap-2">
              <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
              <span>Mark as Available</span>
            </label>

            {/* Variants */}
            <div>
              <label className="block font-medium mb-2">Variants</label>
              {variants.map((variant, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input value={variant.name} onChange={(e) => handleVariantChange(idx, "name", e.target.value)} placeholder="Name" className="flex-1 border px-3 py-2 rounded" />
                  <input type="number" value={variant.price} onChange={(e) => handleVariantChange(idx, "price", e.target.value)} placeholder="Price" className="w-24 border px-3 py-2 rounded" />
                  <button type="button" onClick={() => removeField("variant", idx)} className="text-red-500">X</button>
                </div>
              ))}
              <button type="button" onClick={() => addField("variant")} className="text-sm text-blue-600">+ Add Variant</button>
            </div>

            {/* Add-ons */}
            <div>
              <label className="block font-medium mb-2">Add-ons</label>
              {addons.map((addon, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input value={addon.name} onChange={(e) => handleAddonChange(idx, "name", e.target.value)} placeholder="Name" className="flex-1 border px-3 py-2 rounded" />
                  <input type="number" value={addon.price} onChange={(e) => handleAddonChange(idx, "price", e.target.value)} placeholder="Price" className="w-24 border px-3 py-2 rounded" />
                  <button type="button" onClick={() => removeField("addon", idx)} className="text-red-500">X</button>
                </div>
              ))}
              <button type="button" onClick={() => addField("addon")} className="text-sm text-blue-600">+ Add Add-on</button>
            </div>

            <Button type="submit" className="w-fit mt-4" disabled={isPending}>
              {isPending ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Item" : "Create Item")}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddEditMenuItem;
