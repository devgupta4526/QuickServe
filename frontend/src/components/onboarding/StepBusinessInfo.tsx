import type { BusinessInfoProps } from "../../types/onboarding.types";
import TextInput from "../ui/TextInput";
import { Briefcase } from "lucide-react";

const StepBusinessInfo = ({ formData, handleChange }: BusinessInfoProps) => (
  <div className="space-y-6">
    <div className="text-left">
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
        <Briefcase className="w-6 h-6 text-blue-500" />
        Business Details
      </div>
      <p className="text-sm text-gray-500 mt-1">Tell us a bit about your business.</p>
    </div>

    <div className="space-y-4">
      <TextInput
        label="Business Name"
        name="businessName"
        value={formData.businessName}
        onChange={handleChange}
        placeholder="e.g. QuickServe Inc"
      />
      <TextInput
        label="Industry Type"
        name="industryType"
        value={formData.industryType}
        onChange={handleChange}
        placeholder="e.g. restaurant, retail"
      />
      <TextInput
        label="GST Number"
        name="gstNumber"
        value={formData.gstNumber}
        onChange={handleChange}
        placeholder="Optional GSTIN (e.g. 27ABCDE1234F1Z5)"
      />
    </div>
  </div>
);

export default StepBusinessInfo;
