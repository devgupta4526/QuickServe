import InventoryModel from "../models/inventory.model";
import { CreateInventoryInput } from "../schema/inventory.schema";
import { StockAdjustmentInput } from "../schema/inventory.schema";

export const createInventoryItem = async (data: CreateInventoryInput) => {
    return await InventoryModel.create(data);
};

export const getInventoryByOutlet = async (outletId: string, lowStockOnly = false) => {
    const filter: any = { outletId };
    if (lowStockOnly) filter.status = { $in: ["Low Stock", "Out of Stock"] };
    return await InventoryModel.find(filter).sort({ createdAt: -1 });
};

export const getInventoryItemById = async (id: string) => {
    return await InventoryModel.findById(id);
};

export const updateInventoryItem = async (id: string, updates: Partial<CreateInventoryInput>) => {
    return await InventoryModel.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteInventoryItem = async (id: string) => {
    return await InventoryModel.findByIdAndDelete(id);
};




export const adjustStock = async (input: StockAdjustmentInput) => {
    const { outletId, itemName, type, quantity } = input;

    const item = await InventoryModel.findOne({ outletId, name: itemName });
    if (!item) throw new Error("Item not found");

    item.quantity = type === "increase"
        ? item.quantity + quantity
        : Math.max(0, item.quantity - quantity); // prevent negative stock

    await item.save();
    return item;
};

