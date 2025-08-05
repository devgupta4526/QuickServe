import CustomerModel from "../models/customer.model";
import { CreateCustomerInput } from "../schema/customer.schema";

export const createCustomer = async (data: CreateCustomerInput, imageUrl?: string) => {
    return await CustomerModel.create({
        ...data,
        imageUrl
    });
};

export const getCustomers = async () => {
    return await CustomerModel.find();
};

export const getCustomerById = async (id: string) => {
    return await CustomerModel.findById(id);
};

export const updateCustomer = async (id: string, updates: Partial<CreateCustomerInput>, imageUrl?: string) => {
    const updateData = imageUrl ? { ...updates, imageUrl } : updates;
    return await CustomerModel.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteCustomer = async (id: string) => {
    return await CustomerModel.findByIdAndDelete(id);
};

export const getCustomerByPhone = async (phone: string) => {
    return await CustomerModel.findOne({ phone });
};
