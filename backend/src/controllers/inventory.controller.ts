import { CREATED, OK } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import appAssert from "../utils/appAssert";
import ApiResponse from "../utils/ApiResponse";
import { createInventorySchema, stockAdjustmentSchema } from "../schema/inventory.schema";
import {
    adjustStock,
    createInventoryItem,
    deleteInventoryItem,
    getInventoryByOutlet,
    getInventoryItemById,
    updateInventoryItem,
} from "../services/inventory.service";

export const createInventoryHandler = catchErrors(async (req, res) => {
    const body = createInventorySchema.parse(req.body);
    const item = await createInventoryItem(body);
    return res.status(CREATED).json(new ApiResponse(CREATED, item, "Inventory item created"));
});

export const getInventoryHandler = catchErrors(async (req, res) => {
    const outletId = req.params.outletId;
    const lowStockOnly = req.query.lowStockOnly === "true";
    appAssert(outletId, 400, "Missing outletId");

    const items = await getInventoryByOutlet(outletId, lowStockOnly);
    return res.status(OK).json(new ApiResponse(OK, items, "Fetched inventory"));
});

export const getInventoryItemHandler = catchErrors(async (req, res) => {
    const item = await getInventoryItemById(req.params.id);
    appAssert(item, 404, "Item not found");
    return res.status(OK).json(new ApiResponse(OK, item, "Fetched item"));
});

export const updateInventoryHandler = catchErrors(async (req, res) => {
    const updates = createInventorySchema.partial().parse(req.body);
    const updated = await updateInventoryItem(req.params.id, updates);
    return res.status(OK).json(new ApiResponse(OK, updated, "Inventory item updated"));
});

export const deleteInventoryHandler = catchErrors(async (req, res) => {
    const deleted = await deleteInventoryItem(req.params.id);
    return res.status(OK).json(new ApiResponse(OK, deleted, "Inventory item deleted"));
});

export const adjustStockHandler = catchErrors(async (req, res) => {
    const body = stockAdjustmentSchema.parse(req.body);
    const updatedItem = await adjustStock(body);
    return res.status(OK).json(new ApiResponse(OK, updatedItem, "Stock adjusted"));
});
