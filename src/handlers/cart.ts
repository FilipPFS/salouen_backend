import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../mg-models/User";

export const getUserCart: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    res.status(200).json(user?.cart);
  } catch (err) {
    next(err);
  }
};

export const addCartItem: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { productId, ...rest } = req.body;

    console.log(req.body);

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    let updatedItem;
    const existingItem = user.cart?.find(
      (product) => product.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += rest.quantity || 1;
      updatedItem = existingItem;
    } else {
      updatedItem = { productId, ...rest, quantity: 1 };
      user.cart?.push(updatedItem);
    }

    await user.save();

    res.status(201).json({
      message: "Successfully added item to the cart.",
      cart: user.cart,
      lastAddedItem: updatedItem,
    });
  } catch (err) {
    next(err);
  }
};

export const increaseQuantityItem: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { productId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log(user.cart);
    const product = user.cart?.find(
      (el) => el.productId.toString() === productId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart." });
    }

    product.quantity++;
    await user.save();

    res
      .status(200)
      .json({ message: "Successfully increased the quantity.", product });
  } catch (err) {
    next(err);
  }
};

export const decreaseCartQuantity: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, productId } = req.params;

  try {
    const user = await User.findById(userId);
    const cart = user?.cart;

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity--;
      } else {
        cart.splice(itemIndex, 1);
      }

      await user.save();
      return res.json({ message: "Item updated", items: cart });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const clearFullCart: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    const result = await User.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Cart cleared successfully", user: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
