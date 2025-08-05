import { Router } from "express";
import upload from "../middleware/multer.middleware";
import {
  createProductHandler,
  deleteProductHandler,
  getProductByIdHandler,
  getProductsHandler,
  updateProductHandler,
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/:outletId", getProductsHandler);
productRouter.post("/", upload.fields([{ name: "image", maxCount: 1 }]), createProductHandler);
productRouter.patch("/:id", upload.fields([{ name: "image", maxCount: 1 }]), updateProductHandler);
productRouter.get("/item/:id", getProductByIdHandler);
productRouter.delete("/:id", deleteProductHandler);

export default productRouter;