import multer from 'multer'
import * as path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/employees'); // Destination directory for storing uploaded files
    },
    filename: (req, file, cb) => {
        // Generate a unique filename for each uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.originalname + '-' + uniqueSuffix + fileExtension);
    }
});

const fileFilter = (_req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const limits = {
    fileSize: 2 * 1024 * 1024,
};

const uploads = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits,
});

export const UploadImageEmployee = uploads.fields([
    { name: 'image'},
    { name: 'idCard'},
    { name: 'taxCard'},
    { name: 'familyCard'},
    { name: 'diploma'},
])