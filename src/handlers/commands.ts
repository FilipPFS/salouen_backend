import { NextFunction, Request, RequestHandler, Response } from "express";
import Command from "../mg-models/Command.";

export const getCommands: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCommands = await Command.find();

    res.status(200).json(allCommands);
  } catch (err) {
    next(err);
  }
};

export const getUserCommands: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const allUserCommands = await Command.find({ userId: id });

    res.status(200).json(allUserCommands);
  } catch (err) {
    next(err);
  }
};
