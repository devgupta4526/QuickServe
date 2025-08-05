import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaUserTie } from "react-icons/fa";
import Sidebar from "../../components/ui/Sidebar";

const mockOutlets = [
    {
        id: "1",
        name: "Checker Cafe - Kolkata",
        address: "Park Street, Kolkata",
        manager: "Ravi Mehra",
    },
    {
        id: "2",
        name: "Checker Cafe - Bangalore",
        address: "Indiranagar, Bangalore",
        manager: "Asha Singh",
    },
];

const OutletList = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Outlets</h2>
                    <button
                        onClick={() => navigate("/add-outlet")}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium shadow-sm transition"
                    >
                        + Add Outlet
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {mockOutlets.map((outlet) => (
                        <div
                            key={outlet.id}
                            className="bg-white border border-gray-200 shadow hover:shadow-md transition rounded-xl p-6 relative"
                        >
                            <h3 className="text-xl font-semibold text-primary mb-1">{outlet.name}</h3>

                            <div className="flex items-center text-sm text-gray-600 mb-1">
                                <FaMapMarkerAlt className="mr-2 text-orange-500" />
                                {outlet.address}
                            </div>

                            <div className="flex items-center text-sm text-gray-600 mb-4">
                                <FaUserTie className="mr-2 text-orange-500" />
                                Manager: <span className="ml-1 font-medium">{outlet.manager}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    className="text-orange-600 border border-orange-500 px-3 py-1 rounded text-sm font-medium hover:bg-orange-50"
                                    onClick={() => navigate(`/edit-outlet/${outlet.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-orange-600"
                                    onClick={() => navigate(`/outlet-dashboard/${outlet.id}`)}
                                >
                                    Manage Outlet
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default OutletList;
