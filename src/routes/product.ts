import { Router } from "express";
import { addProduct, getProducts } from "../handlers/product";
import authMiddleware from "../middlewares/auth";

const express = require("express");
const router: Router = express.Router();

router.post("/", authMiddleware, addProduct);
router.get("/", getProducts);

module.exports = router;
