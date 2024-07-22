import { NextFunction, Request, RequestHandler, Response } from "express";
import Product, { ProductTypes } from "../mg-models/Product";

export const addProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = new Product<ProductTypes>({
      ...req.body,
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getProducts: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProducts = await Product.find();

    res.status(200).json(allProducts);
  } catch (err) {
    next(err);
  }
};
