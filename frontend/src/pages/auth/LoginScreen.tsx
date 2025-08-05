import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { login } from "../../lib/api";
// import loginIllustration from "../assets/react.svg";

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const redirectUrl =
        (location.state as { redirectUrl?: string })?.redirectUrl || "/";

    const {
        mutate: signIn,
        isPending: loading,
        isError,
    } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            navigate(redirectUrl, { replace: true });
        },
    });

    const handleLogin = () => {
        if (!email || password.length < 6) return;
        signIn({ email, password });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex overflow-hidden min-h-[500px]">
                {/* Illustration */}
                <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-50">
                    <img
                        // src={loginIllustration}
                        src=""
                        alt="Login Illustration"
                        className="w-4/5 h-auto"
                    />
                </div>

                {/* Login Form */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                        Welcome Back!
                    </h2>

                    <div className="space-y-5">
                        {isError && (
                            <div className="text-red-500 text-sm text-center">
                                Invalid email or password
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-2.5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-2.5 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleLogin();
                                    }}
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Forgot password */}
                        <div className="text-right">
                            <Link
                                to="/password/forgot"
                                className="text-sm text-orange-500 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login button */}
                        <button
                            onClick={handleLogin}
                            className="w-full px-5 py-2.5 text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-lg disabled:opacity-50"
                            disabled={!email || password.length < 6 || loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-2 mt-4">
                            <div className="flex-grow h-px bg-gray-300" />
                            <span className="text-sm text-gray-500">or</span>
                            <div className="flex-grow h-px bg-gray-300" />
                        </div>

                        {/* Social Login */}
                        <div className="flex gap-4 justify-center">
                            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:shadow">
                                <img
                                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                                    alt="Google"
                                />
                                Google
                            </button>
                            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:shadow">
                                <img
                                    src="https://img.icons8.com/fluency/16/000000/facebook-new.png"
                                    alt="Facebook"
                                />
                                Facebook
                            </button>
                        </div>

                        {/* Sign up link */}
                        <p className="text-sm text-center mt-4 text-gray-600">
                            Don’t have an account?{" "}
                            <Link
                                to="/register"
                                className="text-orange-500 font-medium hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
