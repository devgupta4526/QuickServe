import type { BusinessSettingsProps } from "../../types/onboarding.types";
import TextInput from "../ui/TextInput";
import { Settings } from "lucide-react";

const StepBusinessSettings = ({ formData, handleChange }: BusinessSettingsProps) => (
  <div className="space-y-6">
    <div className="text-left">
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
        <Settings className="w-6 h-6 text-purple-500" />
        Business Preferences
      </div>
      <p className="text-sm text-gray-500 mt-1">Set your default preferences.</p>
    </div>

    <div className="space-y-4">
      <TextInput
        label="Currency"
        name="currency"
        value={formData.currency}
        onChange={handleChange}
        placeholder="e.g. INR, USD"
      />
      <TextInput
        label="Tax Rate (%)"
        name="taxRate"
        value={formData.taxRate}
        onChange={handleChange}
        placeholder="e.g. 18"
      />
      <TextInput
        label="Theme"
        name="theme"
        value={formData.theme}
        onChange={handleChange}
        placeholder="light | dark | custom"
      />
    </div>
  </div>
);

export default StepBusinessSettings;
