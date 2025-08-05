import { Route, Routes, useNavigate } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import { setNavigate } from "./lib/navigation";
import RegisterScreen from "./pages/auth/RegisterScreen";
import ForgotPasswordScreen from "./pages/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "./pages/auth/ResetPasswordScreen";
import VerifyEmailScreen from "./pages/auth/VerifyEmailScreen";
import LoginScreen from "./pages/auth/LoginScreen";
import ProfileScreen from "./pages/auth/ProfileScreen";
import SettingsScreen from "./pages/auth/SettingsScreen";
import BusinessOnboarding from "./pages/onboarding/BusinessOnboarding";
import BusinessAppSelection from "./pages/onboarding/BusinessAppSelection";
import PosDashboard from "./pages/dashboard/PosDashboard";
import ChooseTemplate from "./pages/onboarding/ChooseTemplate";
import DashboardLanding from "./pages/dashboard/DashboardLanding";
import MenuBuilder from "./pages/menu/MenuBuilder";
import AddEditMenuItem from "./pages/menu/AddEditMenuItem";
import ProductList from "./pages/menu/ProductList";
import AddEditProduct from "./pages/menu/AddEditProduct";
import CustomerList from "./pages/customers/CustomerList";
import AddCustomer from "./pages/customers/AddCustomer";
import EditCustomer from "./pages/customers/EditCustomer";
import CustomerCart from "./pages/orders/CustomerCart";
import OrderReview from "./pages/orders/OrderReview";
import Checkout from "./pages/orders/Checkout";
import OrderSuccess from "./pages/orders/OrderSuccess";
import InvoiceSuccess from "./pages/orders/InvoiceSuccess";
import OrderConfirmation from "./pages/orders/OrderConfirmation";
import CustomerOrderTrack from "./pages/orders/CustomerOrderTrack";
import PendingOrders from "./pages/orders/PendingOrders";
import QRPreview from "./pages/qr/QRPreview";
import QRMenuPreview from "./pages/qr/QRMenuPreview";
import InventoryList from "./pages/inventory/InventoryList";
import AddInventoryItem from "./pages/inventory/AddInventoryItem";
import EditInventoryItem from "./pages/inventory/EditInventoryItem";
import LowStockAlerts from "./pages/inventory/LowStockAlerts";
import StockAdjustment from "./pages/inventory/StockAdjustment";
import Tables from "./pages/inventory/Tables";
import BusinessInfoForm from "./pages/onboarding/BusinessInfoForm";
import OutletSetup from "./pages/onboarding/OutletSetup";
import ConfirmSetup from "./pages/onboarding/ConfirmSetup";
import SelectOutlet from "./pages/onboarding/SelectOutlet";
import { OnboardingProvider } from "./hooks/useOnboardingData";
import AddTable from "./pages/inventory/AddTable";
import KitchenDashboard from "./pages/kitchen/KitchenDashboard";
import OrderDetailsKitchen from "./pages/kitchen/OrderDetailsKitchen";
import UserManagement from "./pages/users/UserManagement";
import UserEmployeeManagement from "./pages/users/UserEmployeeManagement";

function App() {
  // set the navigate function on our API client for use in the axios error interceptor
  // this allows us to redirect to the login page when an auth error occurs
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <OnboardingProvider>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route index element={<ProfileScreen />} />
          <Route path="settings" element={<SettingsScreen />} />
        </Route>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/email/verify/:code" element={<VerifyEmailScreen />} />
        <Route path="/password/forgot" element={<ForgotPasswordScreen />} />
        <Route path="/password/reset" element={<ResetPasswordScreen />} />


        {/* Onboarding Routes */}
        {/* <Route path="/app-selection" element={<BusinessAppSelection />} />       // Step 1
      <Route path="/setup/template" element={<ChooseTemplate />} />            // Step 2
      <Route path="/onboarding" element={<BusinessOnboarding />} />            // Step 3
      <Route path="/dashboard" element={<DashboardLanding />} />               // Step 4
      <Route path="/pos-dashboard/:outletId" element={<PosDashboard />} />               // (Step 5: Module Launch) */}
        <Route path="/app-selection" element={<BusinessAppSelection />} />
        <Route path="/setup/template" element={<ChooseTemplate />} />
        <Route path="/setup/business-info" element={<BusinessInfoForm />} />
        <Route path="/setup/outlets" element={<OutletSetup />} />
        <Route path="/setup/confirm" element={<ConfirmSetup />} />
        <Route path="/outlet-selection" element={<SelectOutlet />} />
        <Route path="/dashboard/:outletId" element={<DashboardLanding />} />
        <Route path="/pos-dashboard/:outletId" element={<PosDashboard />} />

        {/* Menu Builder (Next Step) */}
        <Route path="/outlets/:outletId/menu" element={<MenuBuilder />} />
        <Route path="/outlets/:outletId/menu/add" element={<AddEditMenuItem />} />
        <Route path="/outlets/:outletId/menu/edit/:itemId" element={<AddEditMenuItem />} />

        <Route path="/products/:outletId" element={<ProductList />} />
        <Route path="/add-product/:outletId" element={<AddEditProduct />} />
        <Route path="/edit-product/:outletId/:productId" element={<AddEditProduct />} />

        {/* Customer Management */}
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/add" element={<AddCustomer />} />
        <Route path="/customers/edit/:id" element={<EditCustomer />} />

        {/* QR Code Preview */}
        <Route path="/outlets/:outletId/qr-preview" element={<QRPreview />} />
        <Route path="/menu/preview/:outletId" element={<QRMenuPreview />} />

        {/* Orders Customer UI */}
        <Route path="/customer/cart" element={<CustomerCart />} />
        <Route path="/track-order" element={<CustomerOrderTrack />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        {/* Orders Restraunt ui */}
        <Route path="/pos-dashboard/:outletId/checkout" element={<Checkout />} />
        <Route path="/order-review" element={<OrderReview />} />
        <Route path="/dashboard/:outletId/success" element={<OrderSuccess />} />
        <Route path="/invoice-success" element={<InvoiceSuccess />} />
        <Route path="/dashboard/:outletId/orders" element={<PendingOrders />} />


        <Route path="/inventory/:outletId" element={<InventoryList />} />
        <Route path="/inventory/:outletId/add" element={<AddInventoryItem />} />
        <Route path="/inventory/:outletId/edit/:id" element={<EditInventoryItem />} />
        <Route path="/inventory/:outletId/alerts" element={<LowStockAlerts />} />
        <Route path="/inventory/:outletId/adjustment" element={<StockAdjustment />} />
        <Route path="/pos-dashboard/:outletId/tables" element={<Tables />} />
        <Route path="/pos-dashboard/:outletId/tables/add" element={<AddTable />} />

        <Route path="/pos-dashboard/:outletId/kitchen" element={<KitchenDashboard />} />
        <Route path="/pos-dashboard/:outletId/kitchen/orders/:orderId" element={<OrderDetailsKitchen />} />
        <Route path="/admin/users" element={<UserEmployeeManagement />} />

      </Routes>
    </OnboardingProvider>
  );
}

export default App;
