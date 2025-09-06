
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Product, { IProduct } from "../models/productModel";

// Using Express.Request with files property from our type declaration

// ============================
// Add Product
// ============================
export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    // Type assertion to handle the files structure
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    
    const image1 = files?.image1?.[0];
    const image2 = files?.image2?.[0];
    const image3 = files?.image3?.[0];
    const image4 = files?.image4?.[0];

    const productImages = [image1, image2, image3, image4].filter(
      (image): image is Express.Multer.File => image !== undefined
    );

    const imageUrls = await Promise.all(
      productImages.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData: Partial<IProduct> = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true",
      image: imageUrls,
      date: Date.now(),
    };

    const product = new Product(productData);
    await product.save();

    res.status(201).json({ success: true, message: "Product added" });
  } catch (error: any) {
    console.error("Error while adding product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============================
// List All Products
// ============================
export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error: any) {
    console.error("Error while fetching all products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============================
// Remove Product
// ============================
export const removeProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error: any) {
    console.error("Error while removing product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get Single Product

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    res.status(200).json({ success: true, product });
  } catch (error: any) {
    console.error("Error while fetching single product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
