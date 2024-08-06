import { Router } from "express";
import { getCommands, getUserCommands } from "../handlers/commands";

const express = require("express");
const router: Router = express.Router();

router.get("/", getCommands);
router.get("/:id", getUserCommands);

module.exports = router;
