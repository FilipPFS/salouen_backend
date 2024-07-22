import mongoose, { Mongoose } from "mongoose";

export interface ProductTypes {
  title: string;
  description: string;
  img: string;
  price: number;
  category: string;
  stock: number;
  inStock: boolean;
}

interface ProductSchema extends ProductTypes, Document {}

const productSchema = new mongoose.Schema<ProductSchema>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

const Product = mongoose.model<ProductSchema>("Product", productSchema);

export default Product;
