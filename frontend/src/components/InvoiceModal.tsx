// InvoiceModal.tsx
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoiceDocument } from "./InvoicePDF";

const InvoiceModal = ({ selectedOrder, isOpen, onClose }: any) => {
    if (!isOpen || !selectedOrder) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
                <h3 className="text-md font-bold mb-4">Receipt #{selectedOrder._id.slice(-5)}</h3>
                {/* Display summary, items... */}
                <PDFDownloadLink document={<InvoiceDocument order={selectedOrder} />} fileName={`invoice-${selectedOrder._id}.pdf`}>
                    {({ loading }) => (
                        <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
                            {loading ? "Generating PDF..." : "Download Invoice PDF"}
                        </button>
                    )}
                </PDFDownloadLink>
                <button onClick={onClose} className="mt-2 text-gray-600">Close</button>
            </div>
        </div>
    );
};


export default InvoiceModal;
