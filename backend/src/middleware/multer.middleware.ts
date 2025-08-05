
import path from 'path';
import { Request } from 'express';
import fs from 'fs';
import multer from 'multer';




//creating upload folder for files 
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

//creating storage how file will be stored 
const storage = multer.diskStorage({
    destination: function (req: Request, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req: Request, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    },
});

export default upload;

