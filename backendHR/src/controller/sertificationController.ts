import { Request, Response } from "express";
import prisma from "../config/prisma";
//Handling error
import { StatusCodes } from "http-status-codes";
import {
  handleBadRequestResponse,
  handleNotFoundResponse,
  handleServerError,
  handleUnprocessableEntityResponse,
} from "../handle/error";
import {
  deleteFileIfExists,
  uploadedFilePath,
} from "../utils/UploadSertification";
import SertificationValidation from "../validations/SertificationValidation";

const Sertification = {
  getAll: async (req: Request, res: Response) => {
    try {
      const certificate = await prisma.employeeSertification.findMany();
      if (certificate.length > 0) {
        return res.status(StatusCodes.OK).json(certificate);
      } else {
        return handleNotFoundResponse(res, "No certificate found.");
      }
    } catch (error) {
      console.error(error);
      return handleServerError(
        res,
        "An error occurred while fetching certificate."
      );
    }
  },
  getById: async (req: Request, res: Response) => {
    const certificateId = req.params.id;
    try {
      if (!certificateId) {
        return handleBadRequestResponse(res, "Invalid id certificate");
      }
      const certificate = await prisma.employeeSertification.findUnique({
        where: {
          id: certificateId,
        },
      });
      if (certificate) {
        return res.status(StatusCodes.OK).json(certificate);
      } else {
        return handleNotFoundResponse(
          res,
          `Certificate Id ${certificateId} not found`
        );
      }
    } catch (err: any) {
      if (err.code === "P1000" && err.message.includes("5432")) {
        return handleServerError(
          res,
          "Unable to connect to the database server. Please try again later."
        );
      }
      return handleServerError(
        res,
        "Internal Server Error. Please try again later."
      );
    }
  },
  createCertificate: async (req: Request, res: Response) => {
    try {
      const uploadedFiles = uploadedFilePath(req);
      const { error, value } = SertificationValidation.validate(req.body);
      const getFilenameOrDefault = (
        file?: Express.Multer.File
      ): string | null => {
        return file ? file.filename : null;
      };
      if (error) {
        deleteFileIfExists(uploadedFiles);
      }

      const existingCertificate = await prisma.employeeSertification.findUnique(
        {
          where: {
            certificateNo: value.certificateNo,
          },
        }
      );
      if (existingCertificate) {
        return handleUnprocessableEntityResponse(
          res,
          "Certificate with this number already exists"
        );
      } else {
        const existingCertificate2 =
          await prisma.employeeSertification.findFirst({
            where: {
              certificateNo: value.certificateNo,
            },
          });

        if (existingCertificate2) {
          return handleUnprocessableEntityResponse(
            res,
            "Employee with this number already exists"
          );
        }

        let newCertificate;
        try {
          newCertificate = await prisma.employeeSertification.create({
            data: {
              image: uploadedFiles,
              ...value,
            },
          });
        } catch (err) {
          deleteFileIfExists(uploadedFiles);
          throw err;
        }

        if (!newCertificate) {
          return handleUnprocessableEntityResponse(
            res,
            "Failed to add new certificate data"
          );
        }
        res.status(StatusCodes.CREATED).json(newCertificate);
      }
    } catch (err: any) {
      console.error("Error in createCertificate:", err);

      if (err.code === "P1000" && err.message.includes("5432")) {
        return handleServerError(
          res,
          "Unable to connect to the database server. Please try again later."
        );
      }

      return handleServerError(res, "Error creating. Please try again later.");
    }
  },
  putCertificate: async (req: Request, res:Response) => {
    const certificateId = req.params.id
    try {
      const { error, value }: any = SertificationValidation.validate(req.body);

      if (!error) {
        const uploadedFiles = uploadedFilePath(req)
        const existingCertificate = await prisma.employeeSertification.findUnique({
          where: {
            id: certificateId,
          }
        });
        if (!existingCertificate) {
          return handleUnprocessableEntityResponse(
            res,
            `${existingCertificate} does not exist`
          );
        }

        // Update data dalam database
        const updatedEmployee = await prisma.employees.update({
          where: {
            id: certificateId,
          },
          data: {
            image: uploadedFiles ?? existingCertificate.image,
            ...value,
          },
        });

        const deleteFiles = getFilesToDelete(existingCertificate.image);

        // Hapus file lama setelah pembaruan sukses
        cleanupUploadedFiles(deleteFiles);

        res.status(StatusCodes.OK).json(updatedEmployee);
      } else {
        // cleanupUploadedFiles(uploadedFiles);
        return handleUnprocessableEntityResponse(res, error.details[0].message);
      }
    }
  }
};

module.exports = Sertification;
