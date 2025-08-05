import MenuItemModel from "../models/menuitem.model";
import { CreateMenuItemInput } from "../schema/menu.schema";


export const createMenuItem = async (data: CreateMenuItemInput, imageUrl?: string) => {
  return await MenuItemModel.create({
    ...data,
    imageUrl: imageUrl,
  });
};

export const getMenuItemById = async (id: string) => {
   const menuItem =  await MenuItemModel.findById(id);
   return menuItem;
};


export const getMenuItemsByOutlet = async (outletId: string) => {
  const menuItems = await MenuItemModel.find({ outletId: outletId }).populate("category variants addons");
  return menuItems;
};

export const updateMenuItem = async (id: string, updates: Partial<CreateMenuItemInput>, imageUrl?: string) => {
  return await MenuItemModel.findByIdAndUpdate(
    id,
    imageUrl ? { ...updates, imageUrl: imageUrl } : updates,
    { new: true }
  );
};

export const deleteMenuItem = async (id: string) => {
  
 const menuItem = await MenuItemModel.findByIdAndDelete(id);
 return menuItem;
};