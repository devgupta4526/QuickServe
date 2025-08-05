import { Request, Response } from "express";
import * as OutletService from "../services/outlet.service";
import ApiResponse from "../utils/ApiResponse";
import { CREATED, OK } from "../constants/http";

export const createOutlet = async (req: Request, res: Response) => {
    try {
        const outlet = await OutletService.createOutlet(req.body);
        return res
            .status(CREATED)
            .json(new ApiResponse(CREATED, outlet, "Outlet created successfully"));
    } catch (err: any) {
        return res
            .status(500)
            .json(new ApiResponse(500, null, err.message));
    }
};

export const createMultipleOutlets = async (req: Request, res: Response) => {
    try {
        const outlets = await OutletService.createMultipleOutlets(req.body.outlets);
        return res
            .status(CREATED)
            .json(new ApiResponse(CREATED, outlets, "Outlets created successfully"));
    } catch (err: any) {
        return res
            .status(500)
            .json(new ApiResponse(500, null, err.message));
    }
};

export const getBusinessOutlets = async (req: Request, res: Response) => {
    try {
        const { businessId } = req.params;

        const outlets = await OutletService.getOutletsByBusiness(businessId);

        return res
            .status(OK)
            .json(new ApiResponse(OK, outlets, "Outlets fetched successfully"));
    } catch (err: any) {
        return res
            .status(500)
            .json(new ApiResponse(500, null, err.message));
    }
};
