// src/hooks/useBusiness.ts

import useAuth from "./useAuth";

export const useBusiness = () => {
  const { user } = useAuth();
  

  // Ensure user and business exists
  return user?.business || null;
};
