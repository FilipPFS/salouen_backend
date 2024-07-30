import mongoose, { Mongoose } from "mongoose";

export interface TopProductTypes {
  title: string;
  description: string;
  img: string;
  oldPrice: number;
  newPrice: number;
  stock: number;
}

interface TopProductSchema extends TopProductTypes, Document {}

const topProductSchema = new mongoose.Schema<TopProductSchema>({
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
  oldPrice: {
    type: Number,
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const TopProduct = mongoose.model<TopProductSchema>(
  "TopProduct",
  topProductSchema
);

export default TopProduct;
