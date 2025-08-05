import React from "react";
import { X } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete This Product?",
    message = "Are you sure you want to delete this product?",
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[360px] shadow-lg p-6 relative">
                {/* Close Icon */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Warning Icon */}
                <div className="flex flex-col items-center text-center">
                    <div className="text-orange-500 text-4xl mb-2">⚠️</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{message}</p>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={onConfirm}
                            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
                        >
                            Yes
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200 transition"
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
