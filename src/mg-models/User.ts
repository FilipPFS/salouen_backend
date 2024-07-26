import mongoose from "mongoose";
import { CartPdt } from "../models/todos";

interface AddressSchema {
  number: number;
  street: string;
  city: string;
  postalCode: string;
}

interface CartProductSchema extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  img: string;
  title: string;
  quantity: number;
  price: number;
}

export interface UserSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  address?: AddressSchema;
  cart?: CartPdt[];
}

const addressSchema = new mongoose.Schema<AddressSchema>({
  number: {
    type: Number,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
});

const cartProductSchema = new mongoose.Schema<CartProductSchema>({
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

const userSchema = new mongoose.Schema<UserSchema>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  address: {
    type: addressSchema,
    required: false,
  },
  cart: {
    type: [cartProductSchema],
    default: [],
  },
});

const User = mongoose.model<UserSchema>("User", userSchema);

export default User;
