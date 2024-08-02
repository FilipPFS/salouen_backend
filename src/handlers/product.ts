import { NextFunction, Request, RequestHandler, Response } from "express";
import Product, { ProductTypes } from "../mg-models/Product";
import fs from "fs";

export const addProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);

  try {
    const newProduct = new Product({
      ...req.body,
      img: `${req.protocol}://${req.get("host")}/images/${req.file!.filename}`,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
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

export const deleteProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const filename = product.img.split("/images/")[1];
      console.log("Filename", filename);
      fs.unlink(`images/${filename}`, async () => {
        await Product.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Objet supprimé !" });
      });
    }

    const products = await Product.find();

    res
      .status(200)
      .json({ message: "Product deleted successfully.", products });
  } catch (err) {
    next(err);
  }
};

export const updateProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};
