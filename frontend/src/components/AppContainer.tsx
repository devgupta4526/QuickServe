import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import UserMenu from "./UserMenu";

const AppContainer = () => {
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <div className="flex flex-col items-center justify-center w-screen h-[90vh] ">
      <div className="mb-4 animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  ) : user ? (
    <div className="p-4 min-h-screen">
      <UserMenu />
      <Outlet />
    </div>
  ) : (
    <Navigate
      to="/login"
      replace
      state={{
        redirectUrl: window.location.pathname,
      }}
    />
  );
};

export default AppContainer;
