import Sidebar from "../../components/ui/Sidebar";


const QRPreview = () => {
    const fakeQRUrl = "https://quickserve360.com/order/outlet-123";

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">QR Code Preview</h2>
                <div className="flex flex-col items-center gap-4">
                    <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${fakeQRUrl}&size=200x200`}
                        alt="QR Code"
                        className="border rounded p-2 bg-white"
                    />
                    <p className="text-gray-700 text-sm">Scan this QR to view digital menu</p>
                    <p className="text-sm text-blue-600 underline cursor-pointer" onClick={() => window.open(fakeQRUrl, '_blank')}>
                        {fakeQRUrl}
                    </p>
                </div>
            </main>
        </div>
    );
};

export default QRPreview;
