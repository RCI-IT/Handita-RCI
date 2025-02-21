import { Request, Response } from "express";
import prisma from "../config/prisma";
import EmployeeValidation from "../validations/EmployeeValidation";
import unlinkAsync from "../config/deleteImageCloudinary";

//Handling error
import { StatusCodes } from "http-status-codes";
import {
  handleBadRequestResponse,
  handleNotFoundResponse,
  handleServerError,
  handleUnprocessableEntityResponse,
} from "../handle/error";

const EmployeeController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const employees = await prisma.employees.findMany();
      if (employees.length > 0) {
        return res.status(StatusCodes.OK).json(employees);
      } else {
        return handleNotFoundResponse(res, "No employees found.");
      }
    } catch (error) {
      console.error(error);
      return handleServerError(
        res,
        "An error occurred while fetching employees."
      );
    }
  },
  // getById: async (req: Request, res: Response) => {
  //   const employeeId = req.params.id;
  //   try {
  //     if (!employeeId) {
  //       return handleBadRequestResponse(res, "Invalid id employee");
  //     }
  //     const employee = await prisma.employees.findUnique({
  //       where: {
  //         id: employeeId,
  //       },
  //       include: {
  //         document: true,
  //       },
  //     });
  //     if (employee) {
  //       return res.status(StatusCodes.OK).json(employee);
  //     } else {
  //       return handleNotFoundResponse(
  //         res,
  //         `Employee id ${employeeId} not found`
  //       );
  //     }
  //   } catch (err: any) {
  //     if (err.code === "P1000" && err.message.includes("5432")) {
  //       return handleServerError(
  //         res,
  //         "Unable to connect to the database server. Please try again later."
  //       );
  //     }
  //     return handleServerError(
  //       res,
  //       "Internal Server Error. Please try again later."
  //     );
  //   }
  // },
  // createEmployee: async (req: Request, res: Response) => {
  //   try {
  //     const { error, value } = EmployeeValidation.validate(req.body);
  //     if (error)
  //       return handleUnprocessableEntityResponse(res, error.details[0].message);

  //     const getFilenameOrDefault = (
  //       file?: Express.Multer.File
  //     ): string | null => {
  //       return file ? file.filename : null;
  //     };

  //     const { image, idCard, taxCard, familyCard, diploma } = req.files as {
  //       [fieldname: string]: Express.Multer.File[];
  //     };

  //     const existingEmployee = await prisma.employees.findUnique({
  //       where: {
  //         employeeNumber: value.employeeNumber,
  //       },
  //       include: {
  //         document: true,
  //       },
  //     });

  //     if (existingEmployee) {
  //       return handleUnprocessableEntityResponse(
  //         res,
  //         "Employee with this number already exists"
  //       );
  //     } else {
  //       // Check for existing employee with same number and potentially uploaded image
  //       const existingEmployeeWithImage = await prisma.employees.findFirst({
  //         where: {
  //           employeeNumber: value.employeeNumber,
  //         },
  //       });

  //       if (existingEmployeeWithImage) {
  //         return handleUnprocessableEntityResponse(
  //           res,
  //           "Employee with this number already exists"
  //         );
  //       }

  //       let newEmployee;
  //       try {
  //         // Attempt to create employee data, including document creation
  //         newEmployee = await prisma.employees.create({
  //           data: {
  //             image: getFilenameOrDefault(image?.[0]),
  //             ...value,
  //             document: {
  //               create: {
  //                 idCard: getFilenameOrDefault(idCard?.[0]) ?? null,
  //                 taxCard: getFilenameOrDefault(taxCard?.[0]) ?? null,
  //                 familyCard: getFilenameOrDefault(familyCard?.[0]) ?? null,
  //                 diploma: getFilenameOrDefault(diploma?.[0]) ?? null,
  //               },
  //             },
  //           },
  //           include: {
  //             document: true,
  //           },
  //         });
  //       } catch (err) {
  //         // If employee creation fails, remove uploaded files (if any)
  //         const uploadedFiles = [image, idCard, taxCard, familyCard, diploma];
  //         for (const file of uploadedFiles) {
  //           if (file?.[0]) {
  //             // Implement logic to remove the uploaded file based on storage provider
  //             console.error(
  //               "Failed to remove uploaded file:",
  //               file?.[0].filename
  //             );
  //           }
  //         }
  //         throw err; // Re-throw the error to be handled in the catch block below
  //       }

  //       if (!newEmployee) {
  //         return handleUnprocessableEntityResponse(
  //           res,
  //           "Failed to add new employee data"
  //         );
  //       }
  //       res.status(StatusCodes.CREATED).json(newEmployee);
  //     }
  //   } catch (err: any) {
  //     console.error("Error in createEmployee:", err);

  //     if (err.code === "P1000" && err.message.includes("5432")) {
  //       return handleServerError(
  //         res,
  //         "Unable to connect to the database server. Please try again later."
  //       );
  //     }

  //     return handleServerError(res, "Error creating. Please try again later.");
  //   }
  // },
  // putEmployee: async (req: Request, res: Response) => {
  //   const employeeId = req.params.id;
  //   try {
  //     const { error, value }: any = EmployeeValidation.validate(req.body);
  //     if (!error) {
  //       const getFilenameOrDefault = (
  //         file?: Express.Multer.File
  //       ): string | null => {
  //         return file ? file.filename : null;
  //       };
  //       const { image, idCard, taxCard, familyCard, diploma } = req.files as {
  //         [fieldname: string]: Express.Multer.File[];
  //       };
  //       const existingEmployee = await prisma.employees.findUnique({
  //         where: {
  //           id: employeeId,
  //         },
  //         include: {
  //           document: true,
  //         },
  //       });
  //       if (!existingEmployee) {
  //         return handleUnprocessableEntityResponse(
  //           res,
  //           `${existingEmployee} does not exist`
  //         );
  //       }
  //       const updatedEmployee = await prisma.employees.update({
  //         where: {
  //           id: employeeId,
  //         },
  //         data: {
  //           image: getFilenameOrDefault(image?.[0]) ?? existingEmployee.image,
  //           ...value,
  //           document: {
  //             update: {
  //               idCard: idCard?.[0]
  //                 ? getFilenameOrDefault(idCard[0])
  //                 : existingEmployee.document?.idCard,
  //               taxCard: taxCard?.[0]
  //                 ? getFilenameOrDefault(taxCard[0])
  //                 : existingEmployee.document?.taxCard,
  //               familyCard: familyCard?.[0]
  //                 ? getFilenameOrDefault(familyCard[0])
  //                 : existingEmployee.document?.familyCard,
  //               diploma: diploma?.[0]
  //                 ? getFilenameOrDefault(diploma[0])
  //                 : existingEmployee.document?.diploma,
  //             },
  //           },
  //         },
  //         include: {
  //           document: true,
  //         },
  //       });
  //       const deleteFileIfExists = async (filePath: any) => {
  //         if (
  //           filePath &&
  //           filePath !== updatedEmployee.image &&
  //           filePath !== updatedEmployee.document?.idCard &&
  //           filePath !== updatedEmployee.document?.taxCard &&
  //           filePath !== updatedEmployee.document?.familyCard &&
  //           filePath !== updatedEmployee.document?.diploma
  //         ) {
  //           try {
  //             await unlinkAsync(`public/images/employees/${filePath}`);
  //           } catch (error) {
  //             console.error(`Failed to delete file: ${filePath}`, error);
  //           }
  //         }
  //       };
  //       await deleteFileIfExists(existingEmployee.image);
  //       await deleteFileIfExists(existingEmployee.document?.idCard);
  //       await deleteFileIfExists(existingEmployee.document?.taxCard);
  //       await deleteFileIfExists(existingEmployee.document?.familyCard);
  //       await deleteFileIfExists(existingEmployee.document?.diploma);

  //       res.status(StatusCodes.OK).json(updatedEmployee);
  //     } else {
  //       return handleUnprocessableEntityResponse(res, error.details[0].message);
  //     }
  //   } catch (err: any) {
  //     if (err.code === "P1000" && err.message.includes("5432")) {
  //       return handleServerError(
  //         res,
  //         "Unable to connect to the database server. Please try again later."
  //       );
  //     }
  //     return handleServerError(
  //       res,
  //       "Internal Server Error. Please try again later."
  //     );
  //   }
  // },
  // deleteEmployee: async (req: Request, res: Response) => {
  //   try {
  //     const employeeId: string = req.params.id;
  //     const employee = await prisma.employees.findUniqueOrThrow({
  //       where: {
  //         id: employeeId,
  //       },
  //       include: {
  //         document: true,
  //       },
  //     });

  //     if (!employee) {
  //       return handleNotFoundResponse(res, "Data employee not found");
  //     }

  //     if (employee.image && typeof employee?.image === "string") {
  //       await unlinkAsync(`public/images/employees/${employee?.image}`);
  //     }
  //     if (
  //       employee.document?.idCard &&
  //       typeof employee.document?.idCard === "string"
  //     ) {
  //       await unlinkAsync(
  //         `public/images/employees/${employee.document?.idCard}`
  //       );
  //     }
  //     if (
  //       employee.document?.taxCard &&
  //       typeof employee.document?.taxCard === "string"
  //     ) {
  //       await unlinkAsync(
  //         `public/images/employees/${employee.document?.taxCard}`
  //       );
  //     }
  //     if (
  //       employee.document?.familyCard &&
  //       typeof employee.document?.familyCard === "string"
  //     ) {
  //       await unlinkAsync(
  //         `public/images/employees/${employee.document?.familyCard}`
  //       );
  //     }
  //     if (
  //       employee.document?.diploma &&
  //       typeof employee.document?.diploma === "string"
  //     ) {
  //       await unlinkAsync(
  //         `public/images/employees/${employee.document?.diploma}`
  //       );
  //     }

  //     const deleteEmployee = await prisma.employees.delete({
  //       where: {
  //         id: employeeId,
  //       },
  //       include: {
  //         document: true,
  //       },
  //     });
  //     if (!deleteEmployee)
  //       return handleUnprocessableEntityResponse(
  //         res,
  //         "Gagal menghapus data karyawan"
  //       );
  //     res.status(StatusCodes.OK).json({
  //       message: "Data karyawan berhasil dihapus.",
  //     });
  //   } catch (err: any) {
  //     if (err.code === "P1000" && err.message.includes("5432")) {
  //       return handleServerError(
  //         res,
  //         "Unable to connect to the database server. Please try again later."
  //       );
  //     }
  //     return handleServerError(res, "Error deleting. Please try again later.");
  //   }
  // },
};

module.exports = EmployeeController;
