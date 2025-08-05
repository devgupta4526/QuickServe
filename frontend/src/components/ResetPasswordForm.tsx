import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { resetPassword } from "../lib/api";

interface ResetPasswordFormProps {
  code: string;
}

const ResetPasswordForm: React.FC<{ code: string }> = ({ code }:ResetPasswordFormProps) => {
  const [password, setPassword] = useState("");
  const {
    mutate: resetUserPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: resetPassword,
  });

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Change your password</h1>
      <div className="bg-gray-700 rounded-lg shadow-lg p-8">
        {isError && (
          <div className="mb-3 text-red-400">
            {error.message || "An error occurred"}
          </div>
        )}
        {isSuccess ? (
          <div>
            <div className="mb-3 p-4 bg-green-600 text-white rounded-lg flex items-center">
              <span className="mr-2">✅</span>
              Password updated successfully!
            </div>
            <Link
              to="/login"
              replace
              className="text-blue-400 underline hover:text-blue-300"
            >
              Sign in
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  resetUserPassword({ password, verificationCode: code })
                }
                autoFocus
              />
            </div>
            <button
              disabled={password.length < 6 || isPending}
              onClick={() =>
                resetUserPassword({
                  password,
                  verificationCode: code,
                })
              }
              className={`px-4 py-2 rounded-md font-semibold text-white ${
                password.length < 6 || isPending
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isPending ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ResetPasswordForm;
