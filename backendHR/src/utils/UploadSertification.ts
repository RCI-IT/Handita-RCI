import multer from "multer";
import * as path from "path";
import fs from "fs";

// Base directory untuk upload
const BASE_UPLOAD_DIR = path.join(__dirname, "../public/sertification");

const ensureFolderExists = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureFolderExists(BASE_UPLOAD_DIR);
    cb(null, BASE_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for each uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const fileNameWithoutExt = path.basename(file.originalname, fileExtension); // Hapus ekstensi

    cb(null, `${fileNameWithoutExt}-${uniqueSuffix}${fileExtension}`);
  },
});

const fileFilter = (_req: any, file: any, cb: any) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image and PDF files are allowed!"), false);
  }
};

const limits = {
  fileSize: 2 * 1024 * 1024,
};

export const uploads = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
}).single("certificate");


export const deleteFileIfExists = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};


// export const UploadSertification = uploads.single("certificate");

  
// import express from "express";
// import { uploadCertificate } from "./path/to/uploadCertificate"; // Ganti path sesuai folder kamu

// const app = express();

// app.post("/upload-certificate", (req, res) => {
//   uploadCertificate(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }

//     if (!req.file) {
//       return res.status(400).json({ error: "No certificate file uploaded." });
//     }

//     res.json({
//       message: "Certificate uploaded successfully!",
//       filename: req.file.filename,
//       path: req.file.path,
//     });
//   });
// });
