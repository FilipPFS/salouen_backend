import { Router } from "express";
import { addProduct, deleteProduct, getProducts } from "../handlers/product";
import authMiddleware from "../middlewares/auth";

const express = require("express");
const router: Router = express.Router();

router.post("/", authMiddleware, addProduct);
router.get("/", getProducts);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
