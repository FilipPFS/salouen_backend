import mongoose, { Schema, Document } from "mongoose";

export interface CartProductSchema extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  img: string;
  title: string;
  quantity: number;
  price: number;
}

export const cartProductSchema = new mongoose.Schema<CartProductSchema>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const CartProduct = mongoose.model<CartProductSchema>(
  "CartProduct",
  cartProductSchema
);

export default CartProduct;
