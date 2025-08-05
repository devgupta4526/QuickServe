import { useSearchParams, Link } from "react-router-dom";
import ResetPasswordForm from "../../components/ResetPasswordForm";


const ResetPasswordScreen: React.FC = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");
    const exp = Number(searchParams.get("exp"));
    const now = Date.now();
    const linkIsValid = !!code && !!exp && exp > now;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex overflow-hidden min-h-[500px]">
                {/* Illustration */}
                <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-50">
                    <img
                        // src={Illustration}
                        src = ""
                        alt="Reset Password Illustration"
                        className="w-4/5 h-auto"
                    />
                </div>

                {/* Main Content */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Reset Password</h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Enter your new password below.
                    </p>

                    {linkIsValid ? (
                        <ResetPasswordForm code={code} />
                    ) : (
                        <div className="space-y-5">
                            <div className="flex items-center bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-300">
                                <span className="mr-2">❌</span>
                                The link is either invalid or expired.
                            </div>

                            <Link
                                to="/password/forgot"
                                replace
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Request a new password reset link
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordScreen;
