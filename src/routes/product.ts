import { Router } from "express";
import { addProduct } from "../handlers/product";

const express = require("express");
const router: Router = express.Router();

router.post("/", addProduct);

module.exports = router;
