import { Router } from "express";
import {
    adjustStockHandler,
    createInventoryHandler,
    deleteInventoryHandler,
    getInventoryHandler,
    getInventoryItemHandler,
    updateInventoryHandler,
} from "../controllers/inventory.controller";

const inventoryRouter = Router();

inventoryRouter.get("/:outletId", getInventoryHandler); // ?lowStockOnly=true
inventoryRouter.get("/item/:id", getInventoryItemHandler);
inventoryRouter.post("/", createInventoryHandler);
inventoryRouter.patch("/:id", updateInventoryHandler);
inventoryRouter.delete("/:id", deleteInventoryHandler);
inventoryRouter.post("/adjust", adjustStockHandler);

export default inventoryRouter;
