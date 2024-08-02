import { NextFunction, Request, RequestHandler, Response } from "express";
import TopProduct, { TopProductTypes } from "../mg-models/TopProduct";
import fs from "fs";
import path from "path";

export const addTopProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topProduct = new TopProduct<TopProductTypes>({
      ...req.body,
      img: `${req.protocol}://${req.get("host")}/images/${req.file!.filename}`,
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
    const topProduct = await TopProduct.findById(req.params.id);

    if (topProduct) {
      const filename = topProduct.img.split("/images/")[1];
      console.log("Filename", filename);
      fs.unlink(`images/${filename}`, async () => {
        await TopProduct.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Objet supprimé !" });
      });
    }

    const topProducts = await TopProduct.find();

    res
      .status(200)
      .json({ message: "Product deleted successfully.", topProducts });
  } catch (err) {
    next(err);
  }
};

export const updateTopProduct: RequestHandler = async (req, res, next) => {
  try {
    console.log("Req", req.body);

    const { title, description, newPrice, oldPrice, stock } = req.body;

    const parsedNewPrice = parseInt(newPrice, 10);
    const parsedOldPrice = parseInt(oldPrice, 10);
    const parsedStock = parseInt(stock, 10);

    const updatedData = {
      title,
      description,
      newPrice: parsedNewPrice,
      oldPrice: parsedOldPrice,
      stock: parsedStock,
    };

    const topOffer = await TopProduct.findById(req.params.id);

    if (!topOffer) {
      return res.status(404).json({ message: "Product not found" });
    }

    const trimmedImageUrl = topOffer.img.split("/images/")[1];
    console.log("url", trimmedImageUrl);

    let topObject;

    if (req.file) {
      topObject = {
        ...updatedData,
        img: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      };

      // Delete the old image
      const oldImagePath = path.join("images", trimmedImageUrl);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error lors de la suppression:", err);
        } else {
          console.log("Old image deleted successfully");
        }
      });
    } else {
      topObject = { ...updatedData, img: topOffer.img };
    }

    // Update the product
    const updatedProduct = await TopProduct.findByIdAndUpdate(
      req.params.id,
      { $set: topObject },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Failed to update product" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
