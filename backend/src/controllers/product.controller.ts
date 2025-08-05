import { CREATED, OK } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import appAssert from "../utils/appAssert";
import uploadToCloudinary from "../utils/cloudinaryUploader";
import { createProductSchema } from "../schema/product.schema";
import { createProduct, deleteProduct, getProductById, getProductsByOutlet, updateProduct } from "../services/product.service";
import ApiResponse from "../utils/ApiResponse";

export const createProductHandler = catchErrors(async (req, res) => {
  const imageFile = (req.files as { image?: Express.Multer.File[] })?.image?.[0];
  const imageUrl = imageFile ? await uploadToCloudinary(imageFile.path, "product") : undefined;

  const body = createProductSchema.parse(req.body);
  const product = await createProduct(body, imageUrl);
  return res.status(CREATED).json(new ApiResponse(CREATED, product, "Product created"));

});

export const getProductsHandler = catchErrors(async (req, res) => {
  const outletId = req.params.outletId;
  appAssert(outletId, 400, "Missing outletId");
  const products = await getProductsByOutlet(outletId);
  return res.status(OK).json(new ApiResponse(OK, products, "Fetched products"));

});

export const updateProductHandler = catchErrors(async (req, res) => {
  const id = req.params.id;
  const imageFile = (req.files as { image?: Express.Multer.File[] })?.image?.[0];
  const imageUrl = imageFile ? await uploadToCloudinary(imageFile.path, "product") : undefined;
  const updates = createProductSchema.partial().parse(req.body);
  const updated = await updateProduct(id, updates, imageUrl);
  return res.status(OK).json(new ApiResponse(OK, updated, "Product updated"));
});

export const deleteProductHandler = catchErrors(async (req, res) => {
  const id = req.params.id;
  const deleted = await deleteProduct(id);
  return res.status(OK).json(new ApiResponse(OK, deleted, "Product deleted"));
});

export const getProductByIdHandler = catchErrors(async (req, res) => {
  const id = req.params.id;
  const product = await getProductById(id);
  appAssert(product, 404, "Product not found");
  return res.status(OK).json(new ApiResponse(OK, product, "Fetched product"));
});