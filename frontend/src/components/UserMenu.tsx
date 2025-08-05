import { Menu } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/api";

const UserMenu = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="absolute left-6 bottom-6">
        <img
          src="#"
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </Menu.Button>

      <Menu.Items className="absolute left-6 bottom-20 bg-white rounded-md shadow-lg w-40 z-10">
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => navigate("/")}
              className={`block w-full text-left px-4 py-2 ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Profile
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => navigate("/settings")}
              className={`block w-full text-left px-4 py-2 ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Settings
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={()=>signOut()}
              className={`block w-full text-left px-4 py-2 text-red-600 ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Logout
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default UserMenu;
