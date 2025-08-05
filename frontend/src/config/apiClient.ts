import axios from "axios";
import queryClient from "./queryClient";
import { UNAUTHORIZED } from "../constants/http.mjs";
import { navigate } from "../lib/navigation";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

// Create a separate client for refreshing the access token
const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

// Main API client
const API = axios.create(options);

// ✅ Request Interceptor: Attach businessId and outletId safely
API.interceptors.request.use((config) => {
  const businessId = localStorage.getItem("businessId");
  const outletId = localStorage.getItem("outletId");

  console.log("➡️ Attaching IDs to request:");
  console.log("businessId:", businessId);
  console.log("outletId:", outletId);

  if (config.method === "get") {
    // Append to query params
    config.params = {
      ...(config.params || {}),
      businessId,
      outletId,
    };
  } else {
    const isFormData = config.data instanceof FormData;

    if (isFormData) {
      // ✅ Only append if not already present
      if (businessId && !config.data.has("businessId")) {
        config.data.append("businessId", businessId);
      }
      if (outletId && !config.data.has("outletId")) {
        config.data.append("outletId", outletId);
      }
    } else {
      // Ensure config.data is an object
      const data =
        typeof config.data === "object" && config.data !== null ? config.data : {};

      config.data = {
        ...data,
        businessId: data.businessId ?? businessId,
        outletId: data.outletId ?? outletId,
      };

      config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
      };
    }
  }

  return config;
});

// ✅ Response Interceptor: Handle token refresh & unauthorized errors
API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    if (status === UNAUTHORIZED && data?.errorCode === "InvalidAccessToken") {
      try {
        await TokenRefreshClient.get("/auth/refresh");
        return TokenRefreshClient(config);
      } catch (refreshError) {
        queryClient.clear();
        navigate("/login", {
          state: {
            redirectUrl: window.location.pathname,
          },
        });
      }
    }

    return Promise.reject({ status, ...data });
  }
);

export default API;
