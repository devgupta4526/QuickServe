import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import TextInput from "../../components/ui/TextInput";
import { FiMail } from "react-icons/fi";
import { sendPasswordResetEmail } from "../../lib/api";


const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");

    const {
        mutate: sendPasswordReset,
        isPending,
        isSuccess,
        isError,
        error,
    } = useMutation({
        mutationFn: sendPasswordResetEmail,
    });

    const handleSubmit = () => {
        if (!email) return;
        sendPasswordReset(email);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex overflow-hidden min-h-[500px]">
                {/* Illustration Section */}
                <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-50">
                    <img
                        //   src={Illustration} 
                        src=""
                        alt="Forgot Illustration" className="w-4/5 h-auto" />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Forgot Password</h2>
                    <p className="text-sm text-gray-600 mb-6">Enter your email to receive a reset link.</p>

                    <div className="space-y-5">
                        {isSuccess ? (
                            <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm">
                                ✅ Email sent! Check your inbox for further instructions.
                            </div>
                        ) : (
                            <>
                                <TextInput
                                    label="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    icon={FiMail}
                                />
                                <button
                                    onClick={handleSubmit}
                                    disabled={!email || isPending}
                                    className="w-full px-5 py-2.5 text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-lg disabled:opacity-50"
                                >
                                    {isPending ? "Sending..." : "Continue"}
                                </button>
                            </>
                        )}

                        {isError && (
                            <p className="text-sm text-red-600 mt-2">
                                {error?.message || "Something went wrong"}
                            </p>
                        )}

                        <p className="text-sm text-gray-600 text-center mt-4">
                            Go back to{" "}
                            <Link to="/login" className="text-orange-500 hover:underline">
                                Sign in
                            </Link>{" "}
                            or{" "}
                            <Link to="/register" className="text-orange-500 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;
