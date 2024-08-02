import { log } from "console";
import { RequestHandler } from "express";

const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const storage = multer.memoryStorage();

export const upload = multer({ storage: storage }).single("image");

export const optimized: RequestHandler = (req, res, next) => {
  console.log("File", req.file);

  if (!req.file) {
    return next();
  }

  const name = req.file.originalname
    .replace(/\.[^/.]+$/, "")
    .split(" ")
    .join("_");
  const filename = name + Date.now() + ".webp";

  const outputPath = path.join("images", filename);

  sharp(req.file.buffer)
    .resize({ width: 400 })
    .webp({ quality: 50 })
    .toFile(outputPath, (err: unknown, info: unknown) => {
      if (err) {
        return next(err);
      }

      fs.readdir("images", (err: unknown, files: unknown) => {
        if (err) {
          console.error("Error reading images directory:", err);
          return next(err);
        }

        req.file!.path = outputPath;
        req.file!.filename = filename;
        next();
      });
    });
};
