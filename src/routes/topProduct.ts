import { Router } from "express";
import {
  addTopProduct,
  deleteTopProduct,
  getTopProducts,
  updateTopProduct,
} from "../handlers/topProduct";
import authMiddleware from "../middlewares/auth";

const express = require("express");
const router: Router = express.Router();

router.post("/", authMiddleware, addTopProduct);
router.get("/", getTopProducts);
router.delete("/:id", authMiddleware, deleteTopProduct);
router.put("/:id", authMiddleware, updateTopProduct);

module.exports = router;
