import { useNavigate, useParams } from "react-router-dom";
import clsx from "clsx"; // optional, for active styling
import { sidebarItems } from "../../constants/sidebarItems";

const Sidebar = () => {
    const navigate = useNavigate();
    const outletId = localStorage.getItem("outletId") || "default";


    const handleNavigation = (path : string) => {
        const resolvedPath = path.replace(":outletId", outletId);
        navigate(resolvedPath);
    };

    return (
        <aside className="w-20 bg-white border-r p-4 flex flex-col items-center gap-6">
            {/* Logo or Brand */}
            <div className="h-10 w-10 bg-orange-500 rounded-full" />

            {sidebarItems.map(({ icon: Icon, label, path }, index) => (
                <button
                    key={index}
                    onClick={() => handleNavigation(path)}
                    title={label}
                    className={clsx(
                        "flex flex-col items-center text-gray-400 hover:text-orange-500 transition",
                        "w-full"
                    )}
                >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs mt-1 hidden lg:block">{label}</span>
                </button>
            ))}
        </aside>
    );
};

export default Sidebar;
