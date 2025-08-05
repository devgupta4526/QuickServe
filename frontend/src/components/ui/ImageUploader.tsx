// src/components/common/ImageUploader.tsx

import React from 'react';

interface ImageUploaderProps {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, name, onChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200"
      />
    </div>
  );
};

export default ImageUploader;
