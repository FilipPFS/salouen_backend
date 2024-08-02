import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../handlers/product";
import authMiddleware from "../middlewares/auth";
import { optimized, upload } from "../middlewares/multer_config";

const express = require("express");
const router: Router = express.Router();

router.post("/", upload, optimized, authMiddleware, addProduct);
router.get("/", getProducts);
router.delete("/:id", authMiddleware, deleteProduct);
router.put("/:id", authMiddleware, updateProduct);

module.exports = router;
