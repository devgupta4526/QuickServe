import type { OutletDetailsProps } from "../../types/onboarding.types";
import TextInput from "../ui/TextInput";
import { Store, Plus, Trash2 } from "lucide-react";

const StepOutletDetails = ({ outlets, onChange, onAdd, onRemove }: OutletDetailsProps) => (
  <div className="space-y-6">
    <div className="text-left">
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
        <Store className="w-6 h-6 text-teal-500" />
        Outlet Information
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Add details for each of your outlets.
      </p>
    </div>

    {outlets.map((outlet, index) => (
      <div key={index} className="p-4 bg-gray-50 border rounded-xl space-y-4 relative">
        <TextInput
          label="Outlet Name"
          name="outletName"
          value={outlet.outletName}
          onChange={(e) => onChange(index, "outletName", e.target.value)}
          placeholder="e.g. Main Branch"
        />
        <TextInput
          label="Outlet Address"
          name="outletAddress"
          value={outlet.outletAddress}
          onChange={(e) => onChange(index, "outletAddress", e.target.value)}
          placeholder="e.g. 123 Market Street, City"
        />
        {outlets.length > 1 && (
          <button
            type="button"
            className="absolute top-4 right-4 text-red-500"
            onClick={() => onRemove(index)}
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    ))}

    <div className="text-right">
      <button
        type="button"
        className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
        onClick={onAdd}
      >
        <Plus size={16} /> Add Another Outlet
      </button>
    </div>
  </div>
);

export default StepOutletDetails;
