import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";

import mongoose from "mongoose";

const app = express();

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://filipPbg:petrovic123@cluster0.2a9vmjz.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));

app.use("/api/auth", userRoutes);
app.use("/api/product", productRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(5000);
