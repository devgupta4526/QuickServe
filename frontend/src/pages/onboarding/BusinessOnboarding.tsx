import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StepBusinessInfo from "../../components/onboarding/StepBusinessInfo";
import StepOutletDetails from "../../components/onboarding/StepOutletDetails";
import StepBusinessSettings from "../../components/onboarding/StepBusinessSettings";
import StepReviewSubmit from "../../components/onboarding/StepReviewSubmit";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import { OnboardingFormData, Outlet } from "../../types/onboarding.types";
import { useMutation } from "@tanstack/react-query";
import { createBusinessWithOutlets } from "../../lib/api";

const BusinessOnboarding = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState<OnboardingFormData>({
    businessName: "",
    industryType: "",
    gstNumber: "",
    currency: "INR",
    taxRate: "",
    theme: "light",
    modules: [],
  });

  const [outlets, setOutlets] = useState<Outlet[]>([
    { outletName: "", outletAddress: "" },
  ]);

  useEffect(() => {
    const storedModules = localStorage.getItem("selectedApps");
    if (storedModules) {
      setFormData((prev) => ({ ...prev, modules: JSON.parse(storedModules) }));
    }
  }, []);

  const {
    mutate: submitBusiness,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: createBusinessWithOutlets,
    onSuccess: () => {
      localStorage.removeItem("selectedApps");
      navigate("/dashboard/");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOutletChange = (index: number, field: keyof Outlet, value: string) => {
    const updated = [...outlets];
    updated[index][field] = value;
    setOutlets(updated);
  };

  const handleAddOutlet = () => {
    setOutlets([...outlets, { outletName: "", outletAddress: "" }]);
  };

  const handleRemoveOutlet = (index: number) => {
    setOutlets(outlets.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!formData.modules.length) {
      alert("Please select at least one module before submitting.");
      return;
    }

    submitBusiness({
      business: {
        name: formData.businessName,
        type: formData.industryType,
        gstNumber: formData.gstNumber,
        currency: formData.currency,
        taxPercentage: parseFloat(formData.taxRate) || 0,
        settings: {
          theme: formData.theme,
          modules: formData.modules,
        },
      },
      outlets,
    });
  };

  return (
    <OnboardingLayout
      step={step}
      onBack={() => setStep((prev) => Math.max(prev - 1, 0))}
      onNext={() => setStep((prev) => Math.min(prev + 1, 3))}
      onSubmit={handleSubmit}
      loading={isPending}
    >
      {isError && (
        <p className="text-sm text-red-500 text-center">
          {(error as any)?.response?.data?.message || "Something went wrong"}
        </p>
      )}

      {step === 0 && <StepBusinessInfo formData={formData} handleChange={handleChange} />}
      {step === 1 && (
        <StepOutletDetails
          outlets={outlets}
          onChange={handleOutletChange}
          onAdd={handleAddOutlet}
          onRemove={handleRemoveOutlet}
        />
      )}
      {step === 2 && <StepBusinessSettings formData={formData} handleChange={handleChange} />}
      {step === 3 && <StepReviewSubmit formData={formData} outlets={outlets} />}
    </OnboardingLayout>
  );
};

export default BusinessOnboarding;
