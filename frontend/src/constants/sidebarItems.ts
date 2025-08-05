import {
    LayoutDashboard,
    Store,
    Package,
    DollarSign,
    Users,
    BarChart2,
    UtensilsCrossed,
    Boxes,
    QrCode
} from "lucide-react";

export const sidebarItems = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard/:outletId",
    },
    {
        label: "POS",
        icon: Store,
        path: "/pos-dashboard/:outletId",
    },
    {
        label: "Menu",
        icon: UtensilsCrossed,
        path: "/outlets/:outletId/menu",
    },
    {
        label: "Products",
        icon: Package,
        path: "/products/:outletId",
    },
    {
        label: "Inventory",
        icon: Boxes,
        path: "/inventory/:outletId",
    },
    {
        label: "Orders",
        icon: DollarSign,
        path: "/dashboard/:outletId/orders",
    },
    {
        label: "Customers",
        icon: Users,
        path: "/customers",
    },
    {
        label: "QR Preview",
        icon: QrCode,
        path: "/outlets/:outletId/qr-preview",
    },
    {
        label: "Reports",
        icon: BarChart2,
        path: "/dashboard/:outletId", // You can replace this with a real report page
    },
];
