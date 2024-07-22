import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { UserSchema } from "../mg-models/User";
import { NextFunction, Request, RequestHandler, Response } from "express";

interface SignUpSchema {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginSchema {
  email: string;
  password: string;
}

export const signup: RequestHandler = async (
  req: Request<{}, {}, SignUpSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required." });
    }
    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User<UserSchema>({
      name,
      lastName,
      email,
      password: hashedPass,
      isAdmin: false,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (
  req: Request<{}, {}, LoginSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user === null) {
      res
        .status(401)
        .json({ message: "Paire identifiant/mot de passe est incorrect." }); //  Unauthozired
    } else {
      const thePass = await bcrypt.compare(password, user.password);
      if (!thePass) {
        res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe est incorrect." });
      } else {
        res.status(200).json({
          userId: user._id,
          isAdmin: user.isAdmin,
          token: jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            "RANDOM_TOKEN_SECRET",
            {
              expiresIn: "24h",
            }
          ),
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
