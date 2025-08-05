import { FaLongArrowAltRight } from "react-icons/fa";

export const TableCard = ({
    id,
    name,
    status,
    initials,
    seats,
}: {
    id: string;
    name: string;
    status: string;
    initials: string;
    seats: number;
}) => {
    const getInitial = (name: string) =>
        name ? name.trim().charAt(0).toUpperCase() : "N/A";

    const getStatusStyle = () => {
        if (status === "Booked") return "bg-green-100 text-green-700";
        return "bg-orange-100 text-orange-700";
    };

    return (
        <div className="bg-white shadow-sm border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    Table <FaLongArrowAltRight className="text-gray-400" /> {name}
                </h3>
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle()}`}>
                    {status}
                </span>
            </div>

            <div className="flex items-center justify-center mt-5 mb-8">
                <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg font-bold">
                    {getInitial(initials)}
                </div>
            </div>

            <p className="text-sm text-gray-500 text-center">
                Seats: <span className="font-medium text-gray-800">{seats}</span>
            </p>
        </div>
    );
};
