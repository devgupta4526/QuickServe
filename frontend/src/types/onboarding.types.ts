export interface Outlet {
  outletName: string;
  outletAddress: string;
}

export interface OnboardingFormData {
  businessName: string;
  industryType: string;
  gstNumber: string;
  currency: string;
  taxRate: string;
  theme: string;
  modules: string[]; // Currently unused in the form, but needed for final submission
}

export interface StepProps {
  formData: OnboardingFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Step-specific props
export type BusinessInfoProps = StepProps;
export type BusinessSettingsProps = StepProps;

export interface OutletDetailsProps {
  outlets: Outlet[];
  onChange: (index: number, field: keyof Outlet, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export interface ReviewSubmitProps {
  formData: OnboardingFormData;
  outlets: Outlet[];
}
