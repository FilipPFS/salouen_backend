import mongoose, { Mongoose } from "mongoose";
import { cartProductSchema, CartProductSchema } from "./CartProduct";
import { AddressSchema } from "./User";

export interface CommandSchema {
  userId: string;
  email: string;
  products: CartProductSchema[];
  amount: number;
  address: AddressSchema;
}

const commandSchema = new mongoose.Schema<CommandSchema>({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  products: {
    type: [],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
});

const Command = mongoose.model<CommandSchema>("Command", commandSchema);

export default Command;
