import { CREATED, OK } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import appAssert from "../utils/appAssert";
import uploadToCloudinary from "../utils/cloudinaryUploader";
import { createMenuItemSchema } from "../schema/menu.schema";
import { createMenuItem, deleteMenuItem, getMenuItemById, getMenuItemsByOutlet, updateMenuItem } from "../services/menu.service";
import ApiResponse from "../utils/ApiResponse";

export const createMenuItemHandler = catchErrors(async (req, res) => {
    const imageFile = (req.files as { image?: Express.Multer.File[] })?.image?.[0];
    const imageUrl = imageFile ? await uploadToCloudinary(imageFile.path, "menu") : undefined;

    const body = createMenuItemSchema.parse(req.body);
    const menuItem = await createMenuItem(body, imageUrl);
    return res.status(CREATED).json(new ApiResponse(CREATED, menuItem, "Menu item created"));

});

export const getMenuItemsHandler = catchErrors(async (req, res) => {
    const outletId = req.params.outletId;
    appAssert(outletId, 400, "Missing outletId");
    const menuItems = await getMenuItemsByOutlet(outletId);
    return res.status(OK).json(new ApiResponse(OK, menuItems, "Fetched menu items"));

});

export const updateMenuItemHandler = catchErrors(async (req, res) => {
    const id = req.params.id;
    const imageFile = (req.files as { image?: Express.Multer.File[] })?.image?.[0];
    const imageUrl = imageFile ? await uploadToCloudinary(imageFile.path, "menu") : undefined;
    const updates = createMenuItemSchema.partial().parse(req.body);
    const updated = await updateMenuItem(id, updates, imageUrl);
    return res.status(OK).json(new ApiResponse(OK, updated, "Menu item updated"));

});

export const deleteMenuItemHandler = catchErrors(async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteMenuItem(id);
    return res.status(OK).json(new ApiResponse(OK, deleted, "Menu item deleted"));

});

export const getMenuItemByIdHandler = catchErrors(async (req, res) => {
  const { id } = req.params;
  const item = await getMenuItemById(id);
  appAssert(item, 404, "Menu item not found");
  return res.status(OK).json(new ApiResponse(OK, item, "Fetched menu item"));

});

export const toggleAvailabilityHandler = catchErrors(async (req, res) => {
  const { id } = req.params;
  const item = await getMenuItemById(id);
  appAssert(item, 404, "Menu item not found");

  item.available = !item.available;
  await item.save();

  return res.status(200).json(new ApiResponse(200, item, "Menu item availability toggled"));
});
