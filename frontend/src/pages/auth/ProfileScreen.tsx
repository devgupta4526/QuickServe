// src/pages/Profile.tsx

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../lib/api";
import { useNavigate } from "react-router-dom";

const ProfileScreen: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });
  if (!user) return null;

  const { email, verified, createdAt } = user;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex overflow-hidden min-h-[500px]">
        {/* Illustration */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-50">
          <img 
        //   src={illustration}
        src = ""
           alt="Profile Illustration" className="w-4/5 h-auto" />
        </div>

        {/* Profile Info */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">My Account</h2>

          {!verified && (
            <div className="bg-yellow-100 text-yellow-800 border border-yellow-400 px-4 py-3 rounded-lg text-sm mb-4">
              ⚠️ Please verify your email to activate your account.
            </div>
          )}

          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Email:</strong> <span className="text-gray-800">{email}</span>
            </p>
            <p>
              <strong>Created On:</strong>{" "}
              <span className="text-gray-800">
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>

          <button 
          onClick={()=>signOut()}
          className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
