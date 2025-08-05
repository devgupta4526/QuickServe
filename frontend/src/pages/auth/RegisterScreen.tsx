import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
    FiUser,
    FiMail,
    FiPhone,
    FiLock,
} from "react-icons/fi";
import { register } from "../../lib/api";
import { REGISTER_STRINGS } from "../../constants/strings";
import TextInput from "../../components/ui/TextInput";
import RoleSelector from "../../components/ui/RoleSelector";
import ImageUploader from "../../components/ui/ImageUploader";
import SlideIndicator from "../../components/ui/SlideIndicator";

const RegisterScreen: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        phone: "",
        bio: "",
        password: "",
        confirmPassword: "",
        role: "BUSINESS_OWNER", // 👈 Default role
        avatar: null as File | null,
        coverImage: null as File | null,
        termsAccepted: false,
    });

    const {
        mutate: createAccount,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: register,
        onSuccess: () => {
            navigate("/", { replace: true });
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (role: string) => {
        setFormData((prev) => ({ ...prev, role }));
    };

    const handleImageChange = (field: "avatar" | "coverImage", file: File | null) => {
        if (file) {
            setFormData((prev) => ({ ...prev, [field]: file }));
        }
    };

    const handleNext = () => setStep((s) => Math.min(2, s + 1));
    const handleBack = () => setStep((s) => Math.max(0, s - 1));

    const handleSubmit = () => {
        if (!formData.termsAccepted) return;
        createAccount(formData);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl flex overflow-hidden min-h-[500px]">
                {/* Illustration Panel */}
                <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-50">
                    <img
                        src=""
                        alt="Registration Illustration"
                        className="w-4/5 h-auto"
                    />
                </div>

                {/* Form Panel */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                            {REGISTER_STRINGS.title}
                        </h2>

                        <div className="space-y-5 flex flex-col justify-center min-h-[340px]">
                            {isError && (
                                <div className="text-red-500 text-sm text-center">
                                    {error?.message || "An error occurred"}
                                </div>
                            )}

                            {step === 0 && (
                                <>
                                    <TextInput
                                        label={REGISTER_STRINGS.username}
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        icon={FiUser}
                                    />
                                    <TextInput
                                        label={REGISTER_STRINGS.fullName}
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        icon={FiUser}
                                    />
                                    <TextInput
                                        label={REGISTER_STRINGS.email}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        type="email"
                                        icon={FiMail}
                                    />
                                    <TextInput
                                        label={REGISTER_STRINGS.phone}
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        type="tel"
                                        icon={FiPhone}
                                    />
                                </>
                            )}

                            {step === 1 && (
                                <>
                                    <RoleSelector
                                        value={formData.role}
                                        onChange={handleRoleChange}
                                        options={[
                                            { value: "SUPER_ADMIN", label: "Super Admin" },
                                            { value: "BUSINESS_OWNER", label: "Business Owner" },
                                        ]}
                                    />

                                    {/* Optional Role Descriptions */}
                                    {formData.role === "SUPER_ADMIN" && (
                                        <p className="text-sm text-gray-500">
                                            A Super Admin has full control over the platform.
                                        </p>
                                    )}
                                    {formData.role === "BUSINESS_OWNER" && (
                                        <p className="text-sm text-gray-500">
                                            Business Owners manage business operations and employees.
                                        </p>
                                    )}

                                    <TextInput
                                        label={REGISTER_STRINGS.bio}
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                    />
                                    <ImageUploader
                                        label={REGISTER_STRINGS.avatar}
                                        name="avatar"
                                        onChange={(file) => handleImageChange("avatar", file)}
                                    />
                                    <ImageUploader
                                        label={REGISTER_STRINGS.coverImage}
                                        name="coverImage"
                                        onChange={(file) => handleImageChange("coverImage", file)}
                                    />
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <TextInput
                                        label={REGISTER_STRINGS.password}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        type="password"
                                        icon={FiLock}
                                    />
                                    <TextInput
                                        label={REGISTER_STRINGS.confirmPassword}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        type="password"
                                        icon={FiLock}
                                    />
                                    <div className="flex items-start gap-2 mt-4">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={formData.termsAccepted}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    termsAccepted: e.target.checked,
                                                }))
                                            }
                                            className="mt-1"
                                        />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm text-gray-700 select-none"
                                        >
                                            I agree to the{" "}
                                            <span className="text-blue-600 underline cursor-pointer">
                                                Terms and Conditions
                                            </span>
                                        </label>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Step Navigation */}
                        <div className="flex justify-between mt-6">
                            {step > 0 ? (
                                <button
                                    onClick={handleBack}
                                    className="px-5 py-2.5 text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
                                >
                                    {REGISTER_STRINGS.back}
                                </button>
                            ) : (
                                <span />
                            )}

                            {step < 2 ? (
                                <button
                                    onClick={handleNext}
                                    className="px-5 py-2.5 text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                                >
                                    {REGISTER_STRINGS.next}
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!formData.termsAccepted || isPending}
                                    className={`px-5 py-2.5 text-sm font-medium rounded-lg ${formData.termsAccepted
                                        ? "bg-green-500 hover:bg-green-600 text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                >
                                    {isPending ? "Submitting..." : REGISTER_STRINGS.submit}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Slide Indicator */}
                    <div className="mt-6">
                        <SlideIndicator total={3} current={step} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
