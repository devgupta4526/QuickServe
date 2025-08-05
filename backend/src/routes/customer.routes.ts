import { Router } from "express";
import upload from "../middleware/multer.middleware";
import {
  createCustomerHandler,
  deleteCustomerHandler,
  getCustomerByIdHandler,
  getCustomerByPhoneHandler,
  getCustomersHandler,
  updateCustomerHandler
} from "../controllers/customer.controller";

const customerRouter = Router();

customerRouter.get("/", getCustomersHandler);
customerRouter.post("/", upload.fields([{ name: "image", maxCount: 1 }]), createCustomerHandler);
customerRouter.get("/:id", getCustomerByIdHandler);
customerRouter.patch("/:id", upload.fields([{ name: "image", maxCount: 1 }]), updateCustomerHandler);
customerRouter.delete("/:id", deleteCustomerHandler);
customerRouter.get("/phone/:phone", getCustomerByPhoneHandler);


export default customerRouter;
