import { Router } from "express";
import {
  addUserAdress,
  getAllUsers,
  getUserInfo,
  removeUserAdmin,
  setUserAdmin,
  updateUserAddress,
} from "../handlers/user";
import authMiddleware from "../middlewares/auth";

const express = require("express");
const router: Router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserInfo);
router.post("/set-admin/:id", authMiddleware, setUserAdmin);
router.post("/remove-admin/:id", authMiddleware, removeUserAdmin);
router.post("/set-adress/:id", addUserAdress);
router.put("/update-adress/:id", updateUserAddress);

module.exports = router;
