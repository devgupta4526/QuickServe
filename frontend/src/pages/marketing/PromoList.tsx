import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";


const dummyPromos = [
    {
        id: "PROMO10",
        title: "10% Off on Beverages",
        type: "Percentage",
        value: "10%",
        active: true,
    },
    {
        id: "FREEDESSERT",
        title: "Free Dessert with Main Course",
        type: "Freebie",
        value: "1 Dessert",
        active: false,
    },
];

const PromoList = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Promotions</h2>
                    <Button onClick={() => navigate("/promos/add")}>+ New Promo</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {dummyPromos.map((promo) => (
                        <div
                            key={promo.id}
                            className="border rounded p-4 shadow hover:shadow-md cursor-pointer"
                            onClick={() => navigate(`/promos/edit/${promo.id}`)}
                        >
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                {promo.title}
                            </h3>
                            <p className="text-sm text-gray-600">Type: {promo.type}</p>
                            <p className="text-sm text-gray-600">Value: {promo.value}</p>
                            <span
                                className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                                    promo.active
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-200 text-gray-600"
                                }`}
                            >
                                {promo.active ? "Active" : "Inactive"}
                            </span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default PromoList;
