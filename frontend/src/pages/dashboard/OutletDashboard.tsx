import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";

const OutletDashboard = () => {
    const { outletId } = useParams();
    const navigate = useNavigate();

    // Simulated outlet data (can later be fetched from backend)
    const [outletInfo, setOutletInfo] = useState({
        name: "Checker Cafe - Park Street",
        manager: "Ravi Mehra",
        contact: "9876543210",
        email: "ravi@checkercafe.com",
        address: "Park Street, Kolkata",
        openingHours: "10:00 AM - 10:00 PM",
        gstNumber: "19ABCDE1234F1Z5",
        status: "Active",
    });

    useEffect(() => {
        document.title = outletInfo.name;
    }, [outletInfo.name]);

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 space-y-8 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">{outletInfo.name}</h2>
                        <p className="text-gray-500 text-sm">Outlet operations dashboard</p>
                    </div>
                    <Button  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium shadow-sm transition" onClick={() => navigate(`/edit-outlet/${outletId}`)}>
                        ✎ Edit Outlet Info
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div className="border p-4 rounded-lg bg-white shadow-sm">
                        <h4 className="font-semibold text-gray-600 text-sm mb-1">Manager</h4>
                        <p className="text-gray-800 font-medium">{outletInfo.manager}</p>
                    </div>

                    <div className="border p-4 rounded-lg bg-white shadow-sm">
                        <h4 className="font-semibold text-gray-600 text-sm mb-1">Contact</h4>
                        <p className="text-gray-800 font-medium">{outletInfo.contact}</p>
                    </div>

                    <div className="border p-4 rounded-lg bg-white shadow-sm">
                        <h4 className="font-semibold text-gray-600 text-sm mb-1">Email</h4>
                        <p className="text-gray-800 font-medium">{outletInfo.email}</p>
                    </div>

                    <div className="border p-4 rounded-lg bg-white shadow-sm">
                        <h4 className="font-semibold text-gray-600 text-sm mb-1">GST Number</h4>
                        <p className="text-gray-800 font-medium">{outletInfo.gstNumber}</p>
                    </div>

                    <div className="border p-4 rounded-lg bg-white shadow-sm">
                        <h4 className="font-semibold text-gray-600 text-sm mb-1">Opening Hours</h4>
                        <p className="text-gray-800 font-medium">{outletInfo.openingHours}</p>
                    </div>

                    <div className="border p-4 rounded-lg bg-white shadow-sm">
                        <h4 className="font-semibold text-gray-600 text-sm mb-1">Status</h4>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${outletInfo.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{outletInfo.status}</span>
                    </div>

                    <div className="col-span-3 border p-4 rounded-lg bg-white shadow-sm">
                        <h4 className="font-semibold text-gray-600 text-sm mb-1">Address</h4>
                        <p className="text-gray-800 font-medium">{outletInfo.address}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                    <div className="border p-5 bg-white rounded-xl hover:shadow cursor-pointer text-center" onClick={() => navigate(`/products?outlet=${outletId}`)}>
                        <h3 className="font-semibold text-lg text-gray-700">Manage Menu</h3>
                        <p className="text-xs text-gray-500">Edit, add, or disable products</p>
                    </div>

                    <div className="border p-5 bg-white rounded-xl hover:shadow cursor-pointer text-center" onClick={() => navigate(`/employees?outlet=${outletId}`)}>
                        <h3 className="font-semibold text-lg text-gray-700">Manage Staff</h3>
                        <p className="text-xs text-gray-500">Update roles and assignments</p>
                    </div>

                    <div className="border p-5 bg-white rounded-xl hover:shadow cursor-pointer text-center" onClick={() => navigate(`/tables?outlet=${outletId}`)}>
                        <h3 className="font-semibold text-lg text-gray-700">Manage Tables</h3>
                        <p className="text-xs text-gray-500">Create or assign table layout</p>
                    </div>

                    <div className="border p-5 bg-white rounded-xl hover:shadow cursor-pointer text-center" onClick={() => navigate(`/orders?outlet=${outletId}`)}>
                        <h3 className="font-semibold text-lg text-gray-700">Orders</h3>
                        <p className="text-xs text-gray-500">Live orders and history</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OutletDashboard;
