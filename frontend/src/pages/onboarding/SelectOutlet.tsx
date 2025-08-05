import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBusiness, getBusinessOutlets } from "../../lib/api";
import { Outlet } from "../../hooks/useOnboardingData";
import { useAppContext } from "../../context/AppContext"; // ✅ Context import

const SelectOutlet = () => {
    const navigate = useNavigate();
    const { setBusinessId, setOutletId } = useAppContext(); // ✅ Use context
    const [localBusinessId, setLocalBusinessId] = useState<string | null>(null);

    // Fetch business info
    const businessQuery = useQuery({
        queryKey: ["business"],
        queryFn: getBusiness,
    });

    // When business data is fetched, store it in local and global context
    useEffect(() => {
        if (businessQuery.data?._id) {
            const id = businessQuery.data._id;
            setLocalBusinessId(id);
            setBusinessId(id); // ✅ Store globally
        }
    }, [businessQuery.data]);

    // Fetch outlets using the businessId
    const outletQuery = useQuery<Outlet[]>({
        queryKey: ["outlets", localBusinessId],
        queryFn: () => getBusinessOutlets(localBusinessId!),
        enabled: !!localBusinessId,
    });

    const handleSelect = (outletId: string) => {
        setOutletId(outletId); // ✅ Store globally
        navigate(`/dashboard/${outletId}`);
    };

    // Handle loading state
    if (businessQuery.isLoading || outletQuery.isLoading) {
        return <div className="text-center mt-20 text-gray-500">Loading...</div>;
    }

    // Handle error state
    if (businessQuery.error || outletQuery.error) {
        return (
            <div className="text-center mt-20 text-red-500">
                Failed to load data:{" "}
                {(businessQuery.error as any)?.message || (outletQuery.error as any)?.message}
            </div>
        );
    }

    const outlets = outletQuery.data || [];

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-xl p-6 shadow">
                <h2 className="text-2xl font-bold text-center mb-6">Select an Outlet</h2>
                {outlets.length === 0 ? (
                    <p className="text-center text-gray-500">No outlets found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {outlets.map((outlet) => (
                            <div
                                key={outlet._id}
                                onClick={() => handleSelect(outlet._id!)}
                                className="border p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
                            >
                                <h3 className="font-semibold text-lg mb-1">{outlet.name}</h3>
                                <p className="text-sm text-gray-500">{outlet.address}</p>
                                {outlet.phone && (
                                    <p className="text-sm text-gray-400 mt-1">📞 {outlet.phone}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectOutlet;
