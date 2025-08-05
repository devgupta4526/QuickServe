import { CREATED, OK } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import appAssert from "../utils/appAssert";
import uploadToCloudinary from "../utils/cloudinaryUploader";
import { createCustomerSchema } from "../schema/customer.schema";
import {
    createCustomer,
    deleteCustomer,
    getCustomerById,
    getCustomerByPhone,
    getCustomers,
    updateCustomer
} from "../services/customer.service";
import ApiResponse from "../utils/ApiResponse";

export const createCustomerHandler = catchErrors(async (req, res) => {
    const imageFile = (req.files as { image?: Express.Multer.File[] })?.image?.[0];
    const imageUrl = imageFile ? await uploadToCloudinary(imageFile.path, "customers") : undefined;

    const body = createCustomerSchema.parse(req.body);
    const customer = await createCustomer(body, imageUrl);
    return res.status(CREATED).json(new ApiResponse(CREATED, customer, "Customer created"));
});

export const getCustomersHandler = catchErrors(async (_req, res) => {
    const customers = await getCustomers();
    return res.status(OK).json(new ApiResponse(OK, customers, "Fetched customers"));
});

export const getCustomerByIdHandler = catchErrors(async (req, res) => {
    const id = req.params.id;
    const customer = await getCustomerById(id);
    appAssert(customer, 404, "Customer not found");
    return res.status(OK).json(new ApiResponse(OK, customer, "Fetched customer"));
});

export const updateCustomerHandler = catchErrors(async (req, res) => {
    const id = req.params.id;
    const imageFile = (req.files as { image?: Express.Multer.File[] })?.image?.[0];
    const imageUrl = imageFile ? await uploadToCloudinary(imageFile.path, "customers") : undefined;

    const parsedBody = {
        ...req.body,
        spent: req.body.spent ? Number(req.body.spent) : undefined,
        orders: req.body.orders ? Number(req.body.orders) : undefined,
    };

    const updates = createCustomerSchema.partial().parse(parsedBody);
    const updated = await updateCustomer(id, updates, imageUrl);
    return res.status(OK).json(new ApiResponse(OK, updated, "Customer updated"));
});

export const deleteCustomerHandler = catchErrors(async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteCustomer(id);
    return res.status(OK).json(new ApiResponse(OK, deleted, "Customer deleted"));
});


export const getCustomerByPhoneHandler = catchErrors(async (req, res) => {
    const phone = req.params.phone;
    appAssert(phone, 400, "Phone number is required");
    const customer = await getCustomerByPhone(phone);
    appAssert(customer, 404, "Customer not found");
    return res.status(OK).json(new ApiResponse(OK, customer, "Customer found"));
});
