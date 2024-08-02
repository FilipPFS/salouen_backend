import { NextFunction, Request, RequestHandler, Response } from "express";
import Product, { ProductTypes } from "../mg-models/Product";
import fs from "fs";
import path from "path";

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
    const { title, description, price, stock, category, inStock } = req.body;

    const parsedPrice = parseInt(price, 10);
    const parsedStock = parseInt(stock, 10);

    const updatedData = {
      title,
      description,
      category,
      inStock,
      price: parsedPrice,
      stock: parsedStock,
    };

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const trimmedImageUrl = product.img.split("/images/")[1];
    console.log("url", trimmedImageUrl);

    let productObject;

    if (req.file) {
      productObject = {
        ...updatedData,
        img: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      };

      const oldImagePath = path.join("images", trimmedImageUrl);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error lors de la suppression:", err);
        } else {
          console.log("Old image deleted successfully");
        }
      });
    } else {
      productObject = { ...updatedData, img: product.img };
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productObject },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Failed to update product" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
