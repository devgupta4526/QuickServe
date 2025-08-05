import API from "../config/apiClient";
import queryClient from "../config/queryClient";
import { useAppContext } from "../context/AppContext";

// AUTH
export const register = async (data) => {
  const formData = new FormData();
  for (const key in data) {
    const value = data[key];
    if (value !== null && value !== undefined) {
      if (value instanceof File) formData.append(key, value);
      else if (typeof value === "boolean") formData.append(key, value.toString());
      else formData.append(key, value);
    }
  }

  const res = await API.post("/auth/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res;
};

export const login = async (data) => API.post("/auth/login", data);
export const logout = async () =>{
  await API.get("/auth/logout");
  useAppContext.getState?.()?.clear?.(); 
  useAppContext().clear(); 
  queryClient.clear();
 
} 
export const verifyEmail = async (verificationCode) =>
  API.get(`/auth/email/verify/${verificationCode}`);
export const sendPasswordResetEmail = async (email) =>
  API.post("/auth/password/forgot", { email });
export const resetPassword = async ({ verificationCode, password }) =>
  API.post("/auth/password/reset", { verificationCode, password });

export const getUser = async () => API.get("/user");
export const getSessions = async () => API.get("/sessions");
export const deleteSession = async (id) => API.delete(`/sessions/${id}`);



// USER
// export const getUser = async () => {
//   console.log("getUserCalled:");
//   const res = await API.get("/user");
//   console.log("getUser resp:",res);
//   console.log("getUser resp.data:",res.data);
//   console.log("👤 Returning user:", res.data.data);
//  return res.data.data;
// };



// BUSINESS
export const createBusiness = async (data) => {
  const res = await API.post("/business/create", data);
  return res.data;
};

export const getBusiness = async () => {
  const res = await API.get("/business/me");
  return res.data;
};

export const getBusinessOutlets = async (businessId: string) => {
  const res = await API.get(`/outlets/${businessId}`);
  return res.data;
};

export const createBusinessWithOutlets = async (data) => {
  const res = await API.post("/business/create", data);
  return res.data;
};

// MENU ITEMS
export const createMenuItem = async (data) => {
  const formData = new FormData();

  for (const key in data) {
    const value = data[key];

    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "boolean") {
      formData.append(key, value.toString());
    } else if (Array.isArray(value)) {
      if (key === "variants" || key === "addons") {
        value.forEach((v) => {
          formData.append(`${key}[]`, JSON.stringify(v)); // ✅ Properly stringify objects
        });
      } else {
        value.forEach((v) => formData.append(`${key}[]`, v));
      }
    } else {
      formData.append(key, value);
    }
  }

  const res = await API.post("/menu/menu-items", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const getMenuItems = async (outletId: string) => {
  console.log("getMenuItems Called");
  const res = await API.get(`/menu/${outletId}`);
  console.log("getMenuItems res:",res);
  return res.data;
};

export const toggleAvailability = async (itemId: string) => {
  const res = await API.patch(`/menu/${itemId}/toggle`);
  return res.data;
};

export const getMenuItemById = async (id: string) => {
  const res = await API.get(`/menu/item/${id}`);
  return res.data;
};


export const updateMenuItem = async (id: string, data: any) => {
  const formData = new FormData();

  for (const key in data) {
    const value = data[key];

    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "boolean") {
      formData.append(key, value.toString());
    } else if (Array.isArray(value)) {
      if (key === "variants" || key === "addons") {
        value.forEach((v) => {
          formData.append(`${key}[]`, JSON.stringify(v)); // ✅ Properly stringify objects
        });
      } else {
        value.forEach((v) => formData.append(`${key}[]`, v));
      }
    } else {
      formData.append(key, value);
    }
  }

  const res = await API.patch(`/menu/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// PRODUCTS
export const createProduct = async (formData: FormData) => {
  const res = await API.post("/products", formData);
  return res.data;
};

export const updateProduct = async (id: string, formData: FormData) => {
  const res = await API.patch(`/products/${id}`, formData);
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await API.get(`/products/item/${id}`);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await API.delete(`/products/${id}`);
  return res.data;
};

export const getProductsByOutlet = async (outletId: string) => {
  const res = await API.get(`/products/${outletId}`);
  return res.data;
};

export const getMenuItemsByOutlet = async (outletId: string) => {
  const res = await API.get(`/menu/${outletId}`);
  return res.data;
};

// CUSTOMERS
export const getCustomers = async () => {
  const res = await API.get("/customers");
  return res.data ?? [];
};

export const getCustomerById = async (id: string) => {
  const res = await API.get(`/customers/${id}`);
  return res.data;
};

export const createCustomer = async (formData: FormData) => {
  const res = await API.post("/customers", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateCustomer = async (id: string, formData: FormData) => {
  const res = await API.patch(`/customers/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteCustomer = async (id: string) => {
  const res = await API.delete(`/customers/${id}`);
  return res.data;
};

export const createOrder = async (payload: any) => {
  const res = await API.post("/orders", payload);
  return res.data;
};

export const getCustomerByPhone = async (phone: string) => {
  const res = await API.get(`/customers/phone/${phone}`);
  return res.data;
};

export const getOrdersByOutlet = async (outletId: string) => {
  console.log("getOrderByOutlet:",outletId);
  const res = await API.get(`/orders/${outletId}`);
  console.log("getOrderByOutlet",res);
  return res.data ?? [];
};

// INVENTORY
export const getInventoryByOutlet = async (outletId: string) => {
  const res = await API.get(`/inventory/${outletId}`);
  return res.data;
};

export const createInventoryItem = async (data: any) => {
  const res = await API.post("/inventory", data);
  return res.data;
};

export const updateInventoryItem = async (id: string, data: any) => {
  const res = await API.patch(`/inventory/${id}`, data);
  return res.data;
};

export const getInventoryItem = async (id: string) => {
  const res = await API.get(`/inventory/item/${id}`);
  return res.data;
};

export const getInventoryItemById = async (id) => {
  const res = await API.get(`/inventory/item/${id}`);
  return res.data;
};

export const adjustInventoryStock = async (payload: {
  outletId: string;
  itemName: string;
  type: "increase" | "decrease";
  quantity: number;
  reason?: string;
}) => {
  const res = await API.post(`/inventory/adjust`, payload);
  return res.data;
};


export const getAvailableTables = async (outletId: string) => {
  const res = await API.get(`/tables/${outletId}`);
  console.log("response from getAvailable", res);
  return res.data; // Do NOT filter here
};

export const getTables = async (outletId: string) => {
  console.log("getTables called",outletId);
  const res = await API.get(`/tables/${outletId}`);
  console.log("response from: getTables",res);
  return res.data;
};



export const reserveTable = async (tableId: string, customer: any) => {
  const res = await API.post(`/tables/${tableId}/reserve`, {
    name: customer.name,
    phone: customer.phone,
    customerId: customer.customerId,
  });
  return res.data;
};

export const createTable = async (payload: {
  outletId: string;
  tableNo: string;
  seats: number;
  status: string;
}) => {
  const res = await API.post("/tables", payload);
  return res.data;
};

export const makeTableAvailable = async (tableId: string) => {
  const res = await API.post(`/tables/${tableId}/available`);
  return res.data;
};


// Orders
export const getOrderById = async (id: string) => {
  console.log("orderId",id);
  const res = await API.get(`/orders/item/${id}`);
  console.log("order by Id:",res);
  return res.data;
};

export const updateOrderStatus = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) => {
  const res = await API.patch(`/orders/${orderId}/status`, { status });
  console.log("updateOrderStatus",res);
  return res.data;
};

export const initiatePayment = async (id: string) => {
  const res = await API.post(`/orders/${id}/pay`);
  return res.data;
};

export const verifyPayment = async (payload: any) => {
  const res = await API.post("/orders/payment/verify", payload);
  return res.data;
};

export const updateOrderDetails = async (id: string, payload: any) => {
  const res = await API.patch(`/orders/${id}/details`, payload);
  return res.data;
};


// Fetch all users
export const getAllUsers = async () => {
  const res = await API.get("/admin/users");
  return res.data || [];
};

// Create a new user
export const createUser = async (data: any) => {
  const res = await API.post("/admin/users", data);
  return res.data;
};

// Update user role
export const updateUserRole = async (id: string, role: string) => {
  const res = await API.patch(`/admin/users/${id}/role`, { role });
  return res.data;
};

// Toggle user active status
export const toggleUserActive = async (id: string) => {
  const res = await API.patch(`/admin/users/${id}/active`);
  return res.data;
};

// Delete user
export const deleteUser = async (id: string) => {
  const res = await API.delete(`/admin/users/${id}`);
  return res.data;
};


// Fetch employees
export const getAllEmployees = async () => {
  const res = await API.get("/employees");
  return res.data?.data || [];
};

export const getAllOutlets = () => API.get("/outlets").then(res => res.data.data);
export const getAllRoles = () => API.get("/roles?scope=outlet").then(res => res.data.data);
export const deleteEmployee = (id: string) => API.delete(`/employees/${id}`);
export const createEmployee = (data: any) => API.post("/employees", data).then(res => res.data.data);
