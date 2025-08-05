import React, { ChangeEvent } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (img: File) => void;
}

const ImageUploadModal = ({ isOpen, onClose, onSelect }: Props) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onSelect(file);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-80">
                <h3 className="font-semibold text-gray-800 mb-4">Upload Image</h3>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-4 block w-full"
                />

                <button
                    onClick={onClose}
                    className="mt-2 w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ImageUploadModal;
