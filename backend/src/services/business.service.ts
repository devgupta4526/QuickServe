import BusinessModel from "../models/business.model";
import appAssert from "../utils/appAssert";
import { CREATED, NOT_FOUND, UNAUTHORIZED } from "../constants/http";
import { Types } from "mongoose";

export const createBusiness = async ({
    data,
    ownerId,
}: {
    data: any;
    ownerId: Types.ObjectId;
}) => {
    // Check for existing business for this user (optional, if only 1 business allowed)
    const existing = await BusinessModel.findOne({ owner: ownerId });
    appAssert(!existing, UNAUTHORIZED, "Business already exists for this user");

    const business = await BusinessModel.create({ ...data, owner: ownerId });

    return business;
};

export const getBusinessForUser = async (userId: Types.ObjectId)  => {
    const business = await BusinessModel.findOne({ owner: userId });
    appAssert(business, NOT_FOUND, "No business found for this user");
    return business;
};
