import { useState } from "react";
import { Pencil } from "lucide-react";
import Sidebar from "../../components/ui/Sidebar";

const tabs = [
    "Personal Information",
    "Employees Management",
    "Opening Hours",
    "Login & Password",
];

export default function Settings() {
    const [activeTab, setActiveTab] = useState("Personal Information");
    const [formData, setFormData] = useState({
        firstName: "Saul",
        lastName: "Goodmate",
        email: "saul539@gmail.com",
        phone: "9874561237",
        dob: "2001-06-23",
        position: "Head Cashier",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "Personal Information":
                return (
                    <>
                        <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                        </p>
                        <form className="grid grid-cols-2 gap-4">
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="p-3 border rounded" placeholder="First Name" />
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="p-3 border rounded" placeholder="Last Name" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="p-3 border rounded" placeholder="Email" />
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="p-3 border rounded" placeholder="Phone Number" />
                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="p-3 border rounded" />
                            <input type="text" name="position" value={formData.position} onChange={handleChange} className="p-3 border rounded" placeholder="Position" />
                            <div className="col-span-2">
                                <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded font-semibold">Save Changes</button>
                            </div>
                        </form>
                    </>
                );

            case "Employees Management":
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Employees Management</h3>
                        <p className="text-gray-500">Redirect to employee table with Add/Edit/Delete features.</p>
                    </div>
                );

            case "Opening Hours":
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                <div key={day} className="flex flex-col">
                                    <label className="text-sm font-medium">{day}</label>
                                    <input type="text" placeholder="e.g., 9:00 AM - 5:00 PM" className="p-2 border rounded" />
                                </div>
                            ))}
                        </div>
                        <button className="mt-6 w-full bg-orange-500 text-white py-3 rounded font-semibold">Save Hours</button>
                    </div>
                );

            case "Login & Password":
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Login & Password</h3>
                        <form className="space-y-4">
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="p-3 border rounded w-full" placeholder="Email" />
                            <input type="password" name="password" value={formData.password} onChange={handleChange} className="p-3 border rounded w-full" placeholder="New Password" />
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="p-3 border rounded w-full" placeholder="Confirm Password" />
                            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded font-semibold">Update Credentials</button>
                        </form>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />

            <main className="flex-1 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Setting</h2>

                <div className="grid grid-cols-3 gap-6">
                    {/* Left Panel */}
                    <div className="col-span-1 p-6 border rounded-lg">
                        <div className="flex flex-col items-center">
                            <div className="relative w-24 h-24 mb-3">
                                <img
                                    src="https://randomuser.me/api/portraits/women/44.jpg"
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                                <button className="absolute bottom-0 right-0 bg-orange-500 p-1 rounded-full text-white">
                                    <Pencil size={14} />
                                </button>
                            </div>
                            <h4 className="font-semibold text-lg">Saul Goodmate</h4>
                            <p className="text-sm text-gray-500 mb-6">Manager</p>

                            <div className="space-y-2 w-full">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        className={`w-full flex justify-between items-center p-3 rounded ${activeTab === tab ? "bg-orange-500 text-white" : "border"}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab} <span>&rarr;</span>
                                    </button>
                                ))}
                                <button className="w-full text-orange-500 text-left mt-4">Logout</button>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="col-span-2 border rounded-lg p-6">{renderTabContent()}</div>
                </div>
            </main>
        </div>
    );
}
