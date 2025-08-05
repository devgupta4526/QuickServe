import { OK, CREATED } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import appAssert from "../utils/appAssert";
import ApiResponse from "../utils/ApiResponse";
import { createOrder, getOrdersByOutlet, getOrderById, updateOrderStatus, generateInvoiceForOrder } from "../services/order.service";
import { createOrderSchema, updateOrderSchema } from "../schema/order.schema";
import orderModel from "../models/order.model";

import Razorpay from "razorpay";
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
});

export const createOrderHandler = catchErrors(async (req, res) => {
    const body = createOrderSchema.parse(req.body);
//     if (body.table) {
//     const isValidTable = await isTableValidForOutlet(body.outletId, body.table);
//     appAssert(isValidTable, 400, "Invalid table number for this outlet");
//   }
    const order = await createOrder(body);
    return res.status(CREATED).json(new ApiResponse(CREATED, order, "Order placed"));
});

export const getOrdersHandler = catchErrors(async (req, res) => {
    const outletId = req.params.outletId;
    const { status } = req.query;
    appAssert(outletId, 400, "Missing outletId");
    const orders = await getOrdersByOutlet(outletId, status as string);
    return res.status(OK).json(new ApiResponse(OK, orders, "Orders fetched"));
});

export const getOrderByIdHandler = catchErrors(async (req, res) => {
    const id = req.params.id;
    const order = await getOrderById(id);
    appAssert(order, 404, "Order not found");
    return res.status(OK).json(new ApiResponse(OK, order, "Order found"));
});

export const updateOrderStatusHandler = catchErrors(async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    appAssert(status, 400, "Missing status");
    const updated = await updateOrderStatus(id, status);
    return res.status(OK).json(new ApiResponse(OK, updated, "Order status updated"));
});


// PATCH /:id/details
export const updateOrderDetailsHandler = catchErrors(async (req, res) => {
  const id = req.params.id;
  const updates = updateOrderSchema.parse(req.body);
  const updated = await orderModel.findByIdAndUpdate(id, updates, { new: true });
  return res.status(OK).json(new ApiResponse(OK, updated, "Order details updated"));
});

// GET /:id/invoice
export const generateInvoiceHandler = catchErrors(async (req, res) => {
  const id = req.params.id;
  const invoice = await generateInvoiceForOrder(id);
  return res.status(OK).json(new ApiResponse(OK, invoice, "Invoice generated"));
});

export const initiatePaymentHandler = catchErrors(async (req, res) => {
  const order = await orderModel.findById(req.params.id);
  appAssert(order, 404, "Order not found");

  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round((order.total + (order.tax??0) + (order.charges??0)) * 100),
    currency: "INR",
    receipt: order._id.toString(),
    notes: { outletId: order.outletId }
  });

  order.paymentMethod = "InApp";
  order.paymentProvider = "Razorpay";
  order.paymentReference = razorpayOrder.id;
  await order.save();

  res.status(OK).json(new ApiResponse(OK, {
    key: process.env.RAZORPAY_KEY_ID,
    orderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency
  }, "Payment initiated"));
});

export const verifyPaymentHandler = catchErrors(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const generated = require("crypto")
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");
  appAssert(generated === razorpay_signature, 400, "Invalid signature");

  const order = await orderModel.findOne({ paymentReference: razorpay_order_id });
  appAssert(order, 404, "Order not found");

  order.paymentStatus = "Paid";
  order.paymentId = razorpay_payment_id;
  await order.save();

  res.json(new ApiResponse(OK, { paymentId: razorpay_payment_id }, "Payment verified"));
});
