import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as PizzaController from "./controllers/PizzaController.js";
import * as CartController from "./controllers/CartController.js";
import * as UserController from "./controllers/UserController.js";
import { loginValidation, registerValidation } from "./validations.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import "dotenv/config";
mongoose
  .connect(process.env.MONGODB_URI)
  // "mongodb+srv://dimapen2002:12Dimabob122@cluster0.rnqnljn.mongodb.net/React-Pizza"
  .then(() => {
    console.log("DB OK");
  })
  .catch((err) => console.log("DB ERROR", err));

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.get("/", (req, res) => {
  res.status(500).send("Hi");
});
app.get("/api/allpizza", PizzaController.getAll);
app.get("/api/getpizza/:id", PizzaController.getOnePizza);
app.post("/api/createpizza", PizzaController.create);
//sort by category
app.get("/api/meatpizza", PizzaController.getPizzaMeat);
app.get("/api/veganpizza", PizzaController.getPizzaVegan);
app.get("/api/greelpizza", PizzaController.getPizzaGreel);
app.get("/api/spicypizza", PizzaController.getPizzaSpicy);
app.get("/api/closedpizza", PizzaController.getPizzaClosed);
//sort by categorys
//sort by price,popular,alphabet
app.get("/api/sortprice", PizzaController.getSortPrice);
app.get("/api/sortraiting", PizzaController.getSortRaiting);
app.get("/api/sorttitle", PizzaController.getSortTitle);
//sort by price,popular,alphabet
//sort by CATEGORY/SORT NEW
app.get("/api/categorysort", PizzaController.getCategorySort);
//sort by CATEGORY/SORT NEW
//cart
app.post("/api/addPizza", CartController.addCart);
//cart

//USER//
app.post(
  "/api/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/api/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/api/user", UserController.getMe);
//ORDER//
app.post("/api/order", CartController.makeOrder);
app.get("/api/getorder", CartController.getOrder);
//ORDER//
const PORT = process.env.PORT || 4444;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
