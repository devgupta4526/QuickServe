// src/hooks/useOnboardingData.tsx

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

/** Business Info structure */
export type BusinessInfo = {
  name: string;
  type: "restaurant" | "retail" | "vendor";
  gstNumber?: string;
  currency: string;
  theme: "light" | "dark" | "custom";
};

/** Outlet details */
export type Outlet = {
  outletName: string;
  outletAddress: string;
  phone?: string;
};

/** Onboarding state shape */
interface OnboardingState {
  modules: string[];
  templateId: string | null;
  businessInfo: BusinessInfo | null;
  outlets: Outlet[];
  setModules: (ms: string[]) => void;
  setTemplateId: (t: string | null) => void;
  setBusinessInfo: (b: BusinessInfo) => void;
  setOutlets: (o: Outlet[]) => void;
}

// Create context
const OnboardingContext = createContext<OnboardingState | undefined>(undefined);

/** Provider wrapper for onboarding context */
export const OnboardingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<string[]>([]);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [outlets, setOutlets] = useState<Outlet[]>([]);

  const value: OnboardingState = {
    modules,
    templateId,
    businessInfo,
    outlets,
    setModules,
    setTemplateId,
    setBusinessInfo,
    setOutlets,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

/** Access the onboarding context anywhere in the component tree */
export const useOnboardingData = (): OnboardingState => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboardingData must be used within an OnboardingProvider");
  }
  return context;
};
