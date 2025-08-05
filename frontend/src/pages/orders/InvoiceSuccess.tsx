// src/pages/pos/InvoiceSuccess.tsx

import Sidebar from "../../components/ui/Sidebar";




const InvoiceSuccess = () => {
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <div className="flex flex-col items-center justify-center flex-1 text-center px-6">
                <img
                    src="/images/invoice_success.svg"
                    alt="Invoice Printed"
                    className="max-w-md mb-6"
                />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Invoice Printed Successfully!
                </h1>
                <p className="text-gray-500 text-sm">
                    Please wait a few minutes for your invoice.
                </p>
            </div>
        </div>
    );
};

export default InvoiceSuccess;
