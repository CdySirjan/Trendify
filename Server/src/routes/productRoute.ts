// src/routes/productRoute.ts
import express, { Router } from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  getSingleProduct,
} from "../controllers/productController";
import upload from "../middleware/multer";
import adminAuth from "../middleware/adminAuth";

const productRouter: Router = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", getSingleProduct);
productRouter.get("/list", listProducts);

export default productRouter;
