import { Router } from "express";
import {
  createOrderHandler,
  getOrdersHandler,
  getOrderByIdHandler,
  updateOrderStatusHandler,
  generateInvoiceHandler,
  updateOrderDetailsHandler,
  initiatePaymentHandler,
  verifyPaymentHandler,
} from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.post("/", createOrderHandler);
orderRouter.get("/:outletId", getOrdersHandler);
orderRouter.get("/item/:id", getOrderByIdHandler);
orderRouter.patch("/:id/status", updateOrderStatusHandler);
orderRouter.get("/:id/invoice", generateInvoiceHandler);
orderRouter.patch("/:id/details", updateOrderDetailsHandler);
orderRouter.post("/:id/pay", initiatePaymentHandler);
orderRouter.post("/payment/verify", verifyPaymentHandler);



export default orderRouter;
