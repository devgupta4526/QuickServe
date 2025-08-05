import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import Button from "../../components/ui/Button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMenuItems, toggleAvailability } from "../../lib/api";

const MenuBuilder = () => {
  const navigate = useNavigate();
  const { outletId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: menuItems,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["menu", outletId],
    queryFn: () => getMenuItems(outletId!),
    enabled: !!outletId,
  });

  const { mutate: toggle, isPending: toggling } = useMutation({
    mutationFn: toggleAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu", outletId] });
    },
  });

  const handleToggleAvailability = (itemId: string) => {
    toggle(itemId);
  };

  console.log(menuItems);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Menu Builder</h2>
          <Button
            onClick={() => navigate(`/outlets/${outletId}/menu/add`)}
            className="!w-auto !min-w-0 px-4 py-2 text-sm bg-orange-500 text-white hover:bg-orange-600 rounded-md"
          >
            + Add Item
          </Button>
        </div>


        {isLoading ? (
          <div className="text-center text-gray-500">Loading menu...</div>
        ) : isError ? (
          <div className="text-red-500 text-center">
            {(error as any)?.message || "Failed to fetch menu"}
          </div>
        ) : Array.isArray(menuItems) && menuItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {menuItems.map((item: any) => (
              <div
                key={item._id}
                className="border rounded-lg shadow hover:shadow-md transition"
              >
                {/* Image Section */}
                <div className="h-40 w-full bg-gray-100 rounded-t-lg overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${item.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}
                    >
                      {item.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                  <p className="font-medium text-gray-700">₹{item.price}</p>

                  <div className="flex gap-2 mt-4">
                    <Button
                      className="px-3 py-1 text-sm"
                      onClick={() =>
                        navigate(`/outlets/${outletId}/menu/edit/${item._id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      onClick={() => handleToggleAvailability(item._id)}
                      disabled={toggling}
                    >
                      {item.available ? "Mark Unavailable" : "Mark Available"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-8">
            No menu items found for this outlet.
          </div>
        )}
      </main>
    </div>
  );
};

export default MenuBuilder;
