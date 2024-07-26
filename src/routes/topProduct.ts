import { Router } from "express";
import { addTopProduct, getTopProducts } from "../handlers/topProduct";

const express = require("express");
const router: Router = express.Router();

router.post("/", addTopProduct);
router.get("/", getTopProducts);

module.exports = router;
