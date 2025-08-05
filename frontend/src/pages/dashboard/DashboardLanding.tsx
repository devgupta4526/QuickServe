// src/pages/dashboard/DashboardLanding.tsx

import { useNavigate, useParams } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Utensils,
  Briefcase,
  DollarSign,
  FileText,
  PieChart,
  CreditCard,
  Wallet,
  Mail,
  MessageSquare,
  BarChart2,
  Package,
  ShoppingBag,
  Wrench,
  CheckSquare,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import Button from "../../components/ui/Button2";
import { useQuery } from "@tanstack/react-query";
import { getBusiness, getBusinessOutlets } from "../../lib/api";
import { useEffect, useState } from "react";

// Dashboard modules
export const MODULES = [
  {
    id: "pos",
    name: "Point of Sale",
    description: "Fast billing and order management.",
    icon: <ShoppingCart className="w-6 h-6 text-orange-500" />,
    route: "/pos-dashboard",
  },
  {
    id: "restaurant",
    name: "Restaurant Management",
    description: "Handle table orders and kitchen workflows.",
    icon: <Utensils className="w-6 h-6 text-pink-500" />,
    route: "/restaurant-dashboard",
  },
  {
    id: "crm",
    name: "CRM",
    description: "Manage leads and customers efficiently.",
    icon: <Briefcase className="w-6 h-6 text-blue-600" />,
    route: "/crm-dashboard",
  },
  {
    id: "sales",
    name: "Sales",
    description: "Track and manage your sales pipeline.",
    icon: <DollarSign className="w-6 h-6 text-green-600" />,
    route: "/sales-dashboard",
  },
  {
    id: "invoicing",
    name: "Invoicing",
    description: "Create and manage invoices.",
    icon: <FileText className="w-6 h-6 text-purple-500" />,
    route: "/invoicing-dashboard",
  },
  {
    id: "accounting",
    name: "Accounting",
    description: "Handle accounts and reconciliation.",
    icon: <PieChart className="w-6 h-6 text-indigo-600" />,
    route: "/accounting-dashboard",
  },
  {
    id: "expenses",
    name: "Expenses",
    description: "Monitor business expenses and costs.",
    icon: <CreditCard className="w-6 h-6 text-red-500" />,
    route: "/expenses-dashboard",
  },
  {
    id: "payroll",
    name: "Payroll",
    description: "Manage employee payroll and salaries.",
    icon: <Wallet className="w-6 h-6 text-yellow-600" />,
    route: "/payroll-dashboard",
  },
  {
    id: "email_marketing",
    name: "Email Marketing",
    description: "Send campaigns and track engagement.",
    icon: <Mail className="w-6 h-6 text-emerald-600" />,
    route: "/email-marketing-dashboard",
  },
  {
    id: "sms_marketing",
    name: "SMS Marketing",
    description: "Promote your business via SMS.",
    icon: <MessageSquare className="w-6 h-6 text-cyan-500" />,
    route: "/sms-marketing-dashboard",
  },
  {
    id: "survey",
    name: "Survey",
    description: "Collect feedback and insights.",
    icon: <BarChart2 className="w-6 h-6 text-rose-500" />,
    route: "/survey-dashboard",
  },
  {
    id: "inventory",
    name: "Inventory",
    description: "Track stock and manage supply.",
    icon: <Package className="w-6 h-6 text-green-600" />,
    route: "/inventory-dashboard",
  },
  {
    id: "purchase",
    name: "Purchase",
    description: "Manage vendor purchases and supplies.",
    icon: <ShoppingBag className="w-6 h-6 text-blue-500" />,
    route: "/purchase-dashboard",
  },
  {
    id: "maintenance",
    name: "Maintenance",
    description: "Track and manage repairs or services.",
    icon: <Wrench className="w-6 h-6 text-gray-500" />,
    route: "/maintenance-dashboard",
  },
  {
    id: "quality",
    name: "Quality",
    description: "Ensure quality standards are met.",
    icon: <CheckSquare className="w-6 h-6 text-lime-600" />,
    route: "/quality-dashboard",
  },
];

interface Outlet {
  _id: string;
  name: string;
  address?: string;
}

const DashboardLanding = () => {
  const navigate = useNavigate();
  const { outletId } = useParams<{ outletId: string }>();

  const { data: business, isLoading, error } = useQuery({
    queryKey: ["business"],
    queryFn: getBusiness,
  });

  const [outlets, setOutlets] = useState<Outlet[]>([]);

  useEffect(() => {
    const fetchOutlets = async () => {
      if (business?._id) {
        const result = await getBusinessOutlets(business._id);
        setOutlets(result);
      }
    };
    fetchOutlets();
  }, [business]);

   useEffect(() => {
  if (outletId) {
    localStorage.setItem("outletId", outletId);
  }
}, [outletId]);

  const outlet = outlets.find((outlet: Outlet) => outlet._id === outletId);
  const enabledModules: string[] = business?.settings?.modules ?? [];
  const visibleModules = MODULES.filter((mod) => enabledModules.includes(mod.id));

  if (isLoading) {
    return <div className="text-center mt-20 text-gray-500">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">Failed to load dashboard.</div>;
  }

  if (!outletId || !outlet) {
    return <div className="text-center mt-20 text-yellow-600">Please select a valid outlet to continue.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <LayoutDashboard className="w-7 h-7 text-indigo-600" />
          {business?.name || "Your Business"} - {outlet.name}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          You're viewing the dashboard for this outlet. Choose a module to continue.
        </p>
      </div>

      {visibleModules.length === 0 ? (
        <div className="text-center text-gray-500">No modules enabled. Please update your settings.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {visibleModules.map((module) => (
            <Card
              key={module.id}
              className="hover:shadow-md cursor-pointer transition-all"
              onClick={() => navigate(`${module.route}/${outletId}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {module.icon}
                  <h3 className="text-lg font-semibold text-gray-800">{module.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">{module.description}</p>
                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`${module.route}/${outletId}`);
                  }}
                >
                  Launch
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardLanding;
