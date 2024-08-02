import { Router } from "express";
import {
  addTopProduct,
  deleteTopProduct,
  getTopProducts,
  updateTopProduct,
} from "../handlers/topProduct";
import authMiddleware from "../middlewares/auth";
import { optimized, upload } from "../middlewares/multer_config";

const express = require("express");
const router: Router = express.Router();

router.post("/", upload, optimized, authMiddleware, addTopProduct);
router.get("/", getTopProducts);
router.delete("/:id", authMiddleware, deleteTopProduct);
router.put("/:id", upload, optimized, authMiddleware, updateTopProduct);

module.exports = router;
