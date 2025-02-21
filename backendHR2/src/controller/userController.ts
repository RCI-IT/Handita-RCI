import { Request, Response } from "express";
import prisma from "../config/prisma";
import userValidation from "../validations/UserValidation";

//Handling error
import { StatusCodes } from "http-status-codes";
import {
  handleBadRequestResponse,
  handleNotFoundResponse,
  handleServerError,
  handleUnprocessableEntityResponse,
} from "../handle/error";

const UserController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const users = await prisma.users.findMany();
      if (users.length > 0) {
        return res.status(StatusCodes.OK).json(users);
      } else {
        return handleNotFoundResponse(res, "Users not found");
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
  getByIdUser: async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      if (!userId) {
        return handleBadRequestResponse(res, "Invalid id user");
      }
      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });
      if (user) {
        return res.status(StatusCodes.OK).json(user);
      } else {
        return handleNotFoundResponse(res, `User id ${userId} not found`);
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
  createUser: async (req: Request, res: Response) => {
    try {
      const { error, value } = userValidation.validate(req.body);
      if (error)
        return handleUnprocessableEntityResponse(res, error.details[0].message);

      const getFilenameOrDefault = (
        file?: Express.Multer.File
      ): string | null => {
        return file ? file.filename : null;
      };

      const { image, idCard, taxCard, familyCard, diploma } = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const existingEmployee = await prisma.employees.findUnique({
        where: {
          employeeNumber: value.employeeNumber,
        },
        include: {
          document: true,
        },
      });

      if (existingEmployee) {
        return handleUnprocessableEntityResponse(
          res,
          "Employee with this number already exists"
        );
      } else {
        // Check for existing employee with same number and potentially uploaded image
        const existingEmployeeWithImage = await prisma.employees.findFirst({
          where: {
            employeeNumber: value.employeeNumber,
          },
        });

        if (existingEmployeeWithImage) {
          return handleUnprocessableEntityResponse(
            res,
            "Employee with this number already exists"
          );
        }

        let newEmployee;
        try {
          // Attempt to create employee data, including document creation
          newEmployee = await prisma.employees.create({
            data: {
              image: getFilenameOrDefault(image?.[0]),
              ...value,
              document: {
                create: {
                  idCard: getFilenameOrDefault(idCard?.[0]) ?? null,
                  taxCard: getFilenameOrDefault(taxCard?.[0]) ?? null,
                  familyCard: getFilenameOrDefault(familyCard?.[0]) ?? null,
                  diploma: getFilenameOrDefault(diploma?.[0]) ?? null,
                },
              },
            },
            include: {
              document: true,
            },
          });
        } catch (err) {
          // If employee creation fails, remove uploaded files (if any)
          const uploadedFiles = [image, idCard, taxCard, familyCard, diploma];
          for (const file of uploadedFiles) {
            if (file?.[0]) {
              // Implement logic to remove the uploaded file based on storage provider
              console.error(
                "Failed to remove uploaded file:",
                file?.[0].filename
              );
            }
          }
          throw err; // Re-throw the error to be handled in the catch block below
        }

        if (!newEmployee) {
          return handleUnprocessableEntityResponse(
            res,
            "Failed to add new employee data"
          );
        }
        res.status(StatusCodes.CREATED).json(newEmployee);
      }
    } catch (err: any) {
      console.error("Error in createEmployee:", err);

      if (err.code === "P1000" && err.message.includes("5432")) {
        return handleServerError(
          res,
          "Unable to connect to the database server. Please try again later."
        );
      }

      return handleServerError(res, "Error creating. Please try again later.");
    }
  },
};

module.exports = UserController;
