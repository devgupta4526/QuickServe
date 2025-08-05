import { Request, Response } from "express";
import { CREATED, OK } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import { businessCreationSchema } from "../schema/business.schema";
import { createBusiness, getBusinessForUser } from "../services/business.service";
import uploadToCloudinary from "../utils/cloudinaryUploader";
import { createMultipleOutlets } from "../services/outlet.service";
import ApiResponse from "../utils/ApiResponse";
import UserModel from "../models/user.model";

export const createBusinessHandler = catchErrors(async (req: Request, res: Response) => {
    const ownerId = req.userId;

    const files = req.files as {
        logo?: Express.Multer.File[];
    };

    const logoUrl = files?.logo
        ? await uploadToCloudinary(files.logo[0].path, "business-logos")
        : undefined;

    const validated = businessCreationSchema.parse({
        ...req.body.business,
        logoUrl,
    });

    const business = await createBusiness({ data: validated, ownerId });

    // 🔧 Update user with business ID
    await UserModel.findByIdAndUpdate(ownerId, {
        $set: { business: business._id },
    });

    const outlets = req.body.outlets;
    if (!Array.isArray(outlets)) {
        throw new Error("Invalid outlets format");
    }

    const formattedOutlets = outlets.map((outlet: any) => ({
        name: outlet.outletName,
        address: outlet.outletAddress,
        business: business._id,
    }));

    const createdOutlets = await createMultipleOutlets(formattedOutlets);

    return res
        .status(CREATED)
        .json(new ApiResponse(CREATED, { business, outlets: createdOutlets }, "Business created successfully"));
});

export const getBusinessHandler = catchErrors(async (req: Request, res: Response) => {
    const ownerId = req.userId;
    const business = await getBusinessForUser(ownerId);

    return res
        .status(OK)
        .json(new ApiResponse(OK, business, "Business fetched successfully"));
});
