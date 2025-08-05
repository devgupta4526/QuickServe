import { Router } from "express";
import upload from "../middleware/multer.middleware";
import authorizeEntityAccess from "../middleware/authorizeEntityAccess";
import {
  createMenuItemHandler,
  deleteMenuItemHandler,
  getMenuItemByIdHandler,
  getMenuItemsHandler,
  toggleAvailabilityHandler,
  updateMenuItemHandler,
} from "../controllers/menu.controller";

const menuRouter = Router();

// ✅ GET routes can still be globally authorized
menuRouter.get("/:outletId", authorizeEntityAccess(), getMenuItemsHandler);

// ✅ POST — multer first, then access control
menuRouter.post(
  "/menu-items",
  upload.fields([{ name: "image", maxCount: 1 }]),
  authorizeEntityAccess(),
  createMenuItemHandler
);

// ✅ PATCH — same order
menuRouter.patch(
  "/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  authorizeEntityAccess(),
  updateMenuItemHandler
);

// Other routes
menuRouter.delete("/:id", authorizeEntityAccess(), deleteMenuItemHandler);
menuRouter.get("/item/:id", authorizeEntityAccess(), getMenuItemByIdHandler);
menuRouter.patch("/:id/toggle", authorizeEntityAccess(), toggleAvailabilityHandler);

export default menuRouter;
