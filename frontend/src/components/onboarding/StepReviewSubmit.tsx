import type { ReviewSubmitProps } from "../../types/onboarding.types";
import { CheckCircle } from "lucide-react";

const StepReviewSubmit = ({ formData, outlets }: ReviewSubmitProps) => (
  <div className="space-y-6">
    <div className="text-center">
      <CheckCircle className="w-10 h-10 mx-auto text-green-500 mb-2" />
      <h3 className="text-2xl font-bold text-gray-800">Review & Confirm</h3>
      <p className="text-sm text-gray-500">Please verify your details before submitting.</p>
    </div>

    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <span className="block font-medium text-gray-600">📛 Business Name</span>
          <p className="text-gray-800">{formData.businessName || "—"}</p>
        </div>
        <div>
          <span className="block font-medium text-gray-600">🏷️ Industry Type</span>
          <p className="text-gray-800">{formData.industryType || "—"}</p>
        </div>
        <div>
          <span className="block font-medium text-gray-600">🧾 GST Number</span>
          <p className="text-gray-800">{formData.gstNumber || "—"}</p>
        </div>
        <div>
          <span className="block font-medium text-gray-600">💱 Currency</span>
          <p className="text-gray-800">{formData.currency || "—"}</p>
        </div>
        <div>
          <span className="block font-medium text-gray-600">💰 Tax Rate</span>
          <p className="text-gray-800">{formData.taxRate || "—"}</p>
        </div>
        <div>
          <span className="block font-medium text-gray-600">🎨 Theme</span>
          <p className="text-gray-800">{formData.theme || "—"}</p>
        </div>
        <div className="col-span-full">
          <span className="block font-medium text-gray-600">📦 Modules</span>
          <p className="text-gray-800">{formData.modules?.join(", ") || "—"}</p>
        </div>
      </div>

      {outlets.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Outlets</h4>
          <div className="space-y-2 text-sm text-gray-700">
            {outlets.map((outlet, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div><b>Outlet {i + 1}</b></div>
                <div>Name: {outlet.outletName}</div>
                <div>Address: {outlet.outletAddress}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default StepReviewSubmit;
