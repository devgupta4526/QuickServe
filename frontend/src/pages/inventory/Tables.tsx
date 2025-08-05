import { useState, useEffect } from "react";
import Sidebar from "../../components/ui/Sidebar";
import { TableCard } from "../../components/TableCard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import {
  getTables,
  reserveTable,
  makeTableAvailable,
} from "../../lib/api";

interface Table {
  _id: string;
  tableNo: string;
  status: "Available" | "Booked";
  seats: number;
  customerName?: string;
}

export default function Tables() {
  const { outletId } = useParams<{ outletId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<"all" | "booked" | "available">("all");

  const { data: tables = [], isLoading, isError } = useQuery<Table[]>({
    queryKey: ["tables", outletId],
    queryFn: () => getTables(outletId!),
    enabled: !!outletId,
  });

  const reserveMutation = useMutation({
    mutationFn: ({
      tableId,
      customer,
    }: {
      tableId: string;
      customer: { name: string; phone: string; customerId?: string };
    }) => reserveTable(tableId, customer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables", outletId] });
      alert("✅ Table reserved successfully!");
    },
    onError: () => {
      alert("❌ Failed to reserve table.");
    },
  });

  const makeAvailableMutation = useMutation({
    mutationFn: (tableId: string) => makeTableAvailable(tableId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables", outletId] });
      alert("✅ Table marked as available.");
    },
    onError: () => {
      alert("❌ Failed to update table.");
    },
  });

  const filteredTables = tables.filter((table) =>
    status === "all"
      ? true
      : status === "booked"
      ? table.status.toLowerCase() === "booked"
      : table.status.toLowerCase() === "available"
  );

  const handleManualReserve = (tableId: string) => {
    const name = prompt("Enter customer name:");
    if (!name) return;

    const phone = prompt("Enter customer phone:");
    if (!phone) return;

    reserveMutation.mutate({
      tableId,
      customer: { name, phone },
    });
  };

  const handleMakeAvailable = (tableId: string) => {
    if (window.confirm("Mark this table as available?")) {
      makeAvailableMutation.mutate(tableId);
    }
  };

  useEffect(() => {
    document.title = "POS | Tables";
  }, []);

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Tables</h2>

          <div className="flex space-x-4">
            <div className="w-[150px]">
              <Button
                className="bg-orange-500 text-white"
                onClick={() =>
                  navigate(`/pos-dashboard/${outletId}/tables/add`, {
                    state: { outletId },
                  })
                }
              >
                ➕ Add Table
              </Button>
            </div>
            {["all", "booked", "available"].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  status === s
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700 border"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <p className="text-gray-500">Loading tables...</p>
        ) : isError ? (
          <p className="text-red-500">Failed to fetch tables.</p>
        ) : filteredTables.length === 0 ? (
          <p className="text-gray-500">No tables found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto max-h-[78vh] pr-2">
            {filteredTables.map((table) => (
              <div key={table._id} className="space-y-2">
                <TableCard
                  id={table._id}
                  name={table.tableNo}
                  status={table.status}
                  seats={table.seats}
                  initials={table.customerName || ""}
                />

                {table.status === "Booked" ? (
                  <Button
                    className="w-full text-sm bg-green-500 text-white"
                    onClick={() => handleMakeAvailable(table._id)}
                  >
                    ✅ Make Available
                  </Button>
                ) : (
                  <Button
                    className="w-full text-sm bg-blue-500 text-white"
                    onClick={() => handleManualReserve(table._id)}
                  >
                    📌 Reserve
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
