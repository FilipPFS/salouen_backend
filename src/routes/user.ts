import { Router } from "express";
import { signup } from "../handlers/user";
import { login } from "../handlers/user";

const express = require("express");
const router: Router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
