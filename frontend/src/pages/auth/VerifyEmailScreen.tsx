// src/pages/auth/VerifyEmailScreen.tsx

import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { verifyEmail } from "../../lib/api";

const VerifyEmailScreen = () => {
    const { code } = useParams();
    const { isPending, isSuccess, isError } = useQuery({
        queryKey: ["emailVerification", code],
        queryFn: () => verifyEmail(code!),
    });

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex overflow-hidden min-h-[500px]">
                <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-50">
                    <img
                        //   src={illustration} 
                        src=""
                        alt="Verify Illustration" className="w-4/5 h-auto" />
                </div>

                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center text-center">
                    {isPending ? (
                        <div className="text-gray-500">Verifying...</div>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                {isSuccess ? "✅ Email Verified!" : "❌ Verification Failed"}
                            </h2>

                            {isError && (
                                <p className="text-sm text-gray-600 mb-4">
                                    The verification link is invalid or expired.{" "}
                                    <Link
                                        to="/password/forgot"
                                        replace
                                        className="text-blue-600 hover:underline"
                                    >
                                        Get a new link
                                    </Link>
                                </p>
                            )}

                            <Link
                                to="/"
                                replace
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Back to home
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailScreen;
