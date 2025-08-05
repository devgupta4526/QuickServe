import orderModel from "../models/order.model";
import { CreateOrderInput } from "../schema/order.schema";
import appAssert from "../utils/appAssert";

export const createOrder = async (data: CreateOrderInput) => {
    return await orderModel.create(data);
};

export const getOrdersByOutlet = async (outletId: string, status?: string) => {
    const query = { outletId };
    if (status) Object.assign(query, { status });
    return await orderModel.find(query).sort({ createdAt: -1 });
};

export const getOrderById = async (id: string) => {
    return await orderModel.findById(id);
};

export const updateOrderStatus = async (id: string, status: string) => {
    return await orderModel.findByIdAndUpdate(id, { status }, { new: true });
};

export const generateInvoiceForOrder = async (id: string) => {
  const order = await getOrderById(id);
  appAssert(order, 404, "Order not found");

  // Simulate invoice generation
  return {
    invoiceId: `INV-${Date.now()}`,
    orderId: order._id,
    customerName: order.customer?.name,
    total: order.total,
    tax: order.tax,
    charges: order.charges,
    createdAt: new Date().toISOString(),
    items: order.items,
    status: "Generated"
  };
};





