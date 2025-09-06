
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  bestSeller?: boolean;
  date: number;
}

const productSchema: Schema<IProduct> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: [String], 
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String], 
    required: true,
  },
  bestSeller: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Number,
    required: true,
  },
});

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
