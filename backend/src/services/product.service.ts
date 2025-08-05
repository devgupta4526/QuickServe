import ProductModel from "../models/product.model";
import { CreateProductInput } from "../schema/product.schema";

export const createProduct = async (data: CreateProductInput, imageUrl?: string) => {
  return await ProductModel.create({
    ...data,
    imageUrl,
  });
};

export const getProductsByOutlet = async (outletId: string) => {
  return await ProductModel.find({ outletId });
};

export const getProductById = async (id: string) => {
   const res = await ProductModel.findById(id);
   return res;
};

export const updateProduct = async (id: string, updates: Partial<CreateProductInput>, imageUrl?: string) => {
  const updateData = imageUrl ? { ...updates, imageUrl } : updates;
  return await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteProduct = async (id: string) => {
  return await ProductModel.findByIdAndDelete(id);
};
