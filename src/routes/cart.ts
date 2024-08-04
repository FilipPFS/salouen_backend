import { Router } from "express";
import {
  addCartItem,
  clearFullCart,
  decreaseCartQuantity,
  getUserCart,
  increaseQuantityItem,
} from "../handlers/cart";

const express = require("express");
const router: Router = express.Router();

router.get("/:userId", getUserCart);
router.post("/:userId", addCartItem);
router.post("/:userId/:productId", increaseQuantityItem);
router.post("/remove-item/:userId/:productId", decreaseCartQuantity);
router.delete("/clear-all/:userId", clearFullCart);

module.exports = router;
