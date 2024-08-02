import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";

import mongoose from "mongoose";
import cors from "cors";
import path from "path";

const app = express();

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const topProductRoutes = require("./routes/topProduct");
const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://filipPbg:petrovic123@cluster0.2a9vmjz.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/topProduct", topProductRoutes);
app.use("/api/user", userRoutes);
app.use("/images", express.static(path.join(__dirname, "../images")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(5000);
