// src/services/outlet.service.ts
import OutletModel, { OutletDocument } from "../models/outlet.model";


export const createOutlet = async (data: Partial<OutletDocument>) => {
    const outlet = new OutletModel(data);
    return await outlet.save();
};

export const createMultipleOutlets = async (
    outlets: Partial<OutletDocument>[]
) => {
    return await OutletModel.insertMany(outlets);
};

export const getOutletsByBusiness = async (businessId: string) => {
    const outlets = await OutletModel.find({ business: businessId });
    return outlets;
};
