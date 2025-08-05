import React, { createContext, useContext, useState, useEffect } from "react";

type AppContextType = {
  businessId: string | null;
  outletId: string | null;
  setBusinessId: (id: string | null) => void;
  setOutletId: (id: string | null) => void;
  clear: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businessId, setBusinessIdState] = useState<string | null>(
    () => localStorage.getItem("businessId")
  );
  const [outletId, setOutletIdState] = useState<string | null>(
    () => localStorage.getItem("outletId")
  );

  const setBusinessId = (id: string | null) => {
    setBusinessIdState(id);
    if (id) localStorage.setItem("businessId", id);
    else localStorage.removeItem("businessId");
  };

  const setOutletId = (id: string | null) => {
    setOutletIdState(id);
    if (id) localStorage.setItem("outletId", id);
    else localStorage.removeItem("outletId");
  };

  const clear = () => {
    setBusinessIdState(null);
    setOutletIdState(null);
    localStorage.removeItem("businessId");
    localStorage.removeItem("outletId");
  };

  return (
    <AppContext.Provider
      value={{ businessId, outletId, setBusinessId, setOutletId, clear }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook for consuming the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
