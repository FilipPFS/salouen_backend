import { Router } from "express";
import {
  getAllUsers,
  getUserInfo,
  removeUserAdmin,
  setUserAdmin,
} from "../handlers/user";
import authMiddleware from "../middlewares/auth";

const express = require("express");
const router: Router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserInfo);
router.post("/set-admin/:id", authMiddleware, setUserAdmin);
router.post("/remove-admin/:id", authMiddleware, removeUserAdmin);

module.exports = router;
