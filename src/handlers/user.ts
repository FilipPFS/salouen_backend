import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../mg-models/User";

export const getUserInfo: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const setUserAdmin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found." });
    }

    if (user?.isAdmin === true) {
      res.status(400).json({ message: "User already have admin role." });
    }

    if (user) {
      user.isAdmin = true;
    }

    await user?.save();

    const users = await User.find();

    res.status(201).json({
      message: `User ${user?.firstName} ${user?.lastName} is now admin.`,
      users,
    });
  } catch (err) {
    next(err);
  }
};

export const removeUserAdmin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found." });
    }

    if (user?.id === "669f9e5fc0776c15707878a0") {
      res
        .status(400)
        .json({ message: "You can not remove the admin role from this user." });
      return;
    }

    if (user) {
      user.isAdmin = false;
    }

    await user?.save();

    res.status(200).json({
      message: `User ${user?.firstName} ${user?.lastName} is no longer admin.`,
    });
  } catch (err) {
    next(err);
  }
};
