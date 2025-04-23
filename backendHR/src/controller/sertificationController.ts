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
};

module.exports = Sertification;
