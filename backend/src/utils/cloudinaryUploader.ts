import cloudinary from '../config/cloudinary.config';
import fs from 'fs';

const uploadToCloudinary = async (
    localPath: string,
    folder: string
): Promise<string> => {
    if (!localPath) throw new Error('No path provided');

    try {
        const result = await cloudinary.uploader.upload(localPath, {
            folder,
            resource_type: 'image',
        });

        fs.unlinkSync(localPath); // Clean up local file
        return result.secure_url;
    } catch (error) {
        fs.unlinkSync(localPath); // Still clean up on error
        throw error;
    }
};

export default uploadToCloudinary;