import { NextFunction, Request, RequestHandler, Response } from "express";
import TopProduct, { TopProductTypes } from "../mg-models/TopProduct";

export const addTopProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topProduct = new TopProduct<TopProductTypes>({
      ...req.body,
    });

    await topProduct.save();

    res.status(201).json({ message: "New top product successfully created." });
  } catch (err) {
    next(err);
  }
};

export const getTopProducts: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topProducts = await TopProduct.find();

    res.status(200).json(topProducts);
  } catch (err) {
    next(err);
  }
};
