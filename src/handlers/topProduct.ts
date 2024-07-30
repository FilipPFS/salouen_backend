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

    res.status(201).json(topProduct);
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

export const deleteTopProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topProduct = await TopProduct.findByIdAndDelete(req.params.id);
    const topProducts = await TopProduct.find();

    res
      .status(200)
      .json({ message: "Product deleted successfully.", topProducts });
  } catch (err) {
    next(err);
  }
};

export const updateTopProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await TopProduct.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
