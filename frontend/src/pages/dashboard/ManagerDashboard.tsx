import { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import Sidebar from '../../components/ui/Sidebar';


const bestDishes = [
    {
        name: 'Grill Sandwich',
        price: 30,
        image:
            'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&auto=format&fit=crop&q=60',
        orders: 500,
    },
    {
        name: 'Chicken Popeyes',
        price: 20,
        image:
            'https://images.unsplash.com/photo-1600147184950-b0a367a98bc3?w=600&auto=format&fit=crop&q=60',
        orders: 800,
    },
    {
        name: 'Bison Burgers',
        price: 50,
        image:
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=60',
        orders: 950,
    },
    {
        name: 'Grill Sandwich',
        price: 30,
        image:
            'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&auto=format&fit=crop&q=60',
        orders: 700,
    },
];

const chartData = [
    { name: 'Mon', sales: 20000 },
    { name: 'Tue', sales: 15000 },
    { name: 'Wed', sales: 14000 },
    { name: 'Thu', sales: 12000 },
    { name: 'Fri', sales: 15000 },
    { name: 'Sat', sales: 13000 },
    { name: 'Sun', sales: 10000 },
];

const ManagerDashboard = () => {
    const [selectedTab, setSelectedTab] = useState('This Year');
    const tabs = ['Today', 'This Week', 'This Month', 'This Year'];

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 bg-white p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Manager Dashboard</h1>

                {/* Tabs */}
                <div className="flex justify-end mb-4">
                    <div className="bg-gray-100 p-1 rounded-md flex gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`px-4 py-1 rounded-md text-sm font-medium transition ${selectedTab === tab
                                        ? 'bg-orange-500 text-white'
                                        : 'text-gray-600'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border rounded-lg">
                        <h2 className="font-semibold text-lg mb-4">Total Income</h2>
                        <div className="relative w-40 h-40 mx-auto">
                            <div className="absolute inset-0 rounded-full border-[12px] border-orange-500 border-b-black border-r-gray-300 rotate-[135deg]" />
                            <div className="absolute inset-6 rounded-full bg-white flex items-center justify-center text-xl font-bold">
                                $80,000
                            </div>
                        </div>
                        <div className="flex justify-around text-sm mt-4">
                            <span className="text-orange-500 font-medium">Foodies</span>
                            <span className="text-black font-medium">Cold Drink</span>
                            <span className="text-gray-400 font-medium">Others</span>
                        </div>
                    </div>

                    <div className="p-6 border rounded-lg">
                        <h2 className="font-semibold text-lg mb-4">Total Balance</h2>
                        <p className="text-3xl font-bold text-green-600 mb-4">$1,20,000</p>
                        <div className="text-sm space-y-2">
                            <p>
                                <span className="inline-block w-3 h-3 rounded-full bg-black mr-2"></span>
                                Total Income: $45,500 <span className="text-gray-400">(+60% Increase)</span>
                            </p>
                            <p>
                                <span className="inline-block w-3 h-3 rounded-full bg-orange-400 mr-2"></span>
                                Total Expense: $65,500 <span className="text-gray-400">(+70% Increase)</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Graph and Best Dishes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="p-6 border rounded-lg">
                        <h2 className="font-semibold text-lg mb-4">Daily Selling</h2>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={chartData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={3} fill="#f97316" fillOpacity={0.2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="p-6 border rounded-lg">
                        <h2 className="font-semibold text-lg mb-4">Best Dishes</h2>
                        <div className="space-y-4">
                            {bestDishes.map((dish, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <img src={dish.image} alt={dish.name} className="w-10 h-10 object-cover rounded" />
                                        <div>
                                            <p className="font-medium text-gray-800 truncate w-32">{dish.name}</p>
                                            <p className="text-orange-500 font-medium text-xs">${dish.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-800 font-medium">{dish.orders}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManagerDashboard;
