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
app.use(cors());

app.get("/allpizza", PizzaController.getAll);
app.get("/getpizza/:id", PizzaController.getOnePizza);
app.post("/createpizza", PizzaController.create);
//sort by category
app.get("/meatpizza", PizzaController.getPizzaMeat);
app.get("/veganpizza", PizzaController.getPizzaVegan);
app.get("/greelpizza", PizzaController.getPizzaGreel);
app.get("/spicypizza", PizzaController.getPizzaSpicy);
app.get("/closedpizza", PizzaController.getPizzaClosed);
//sort by categorys
//sort by price,popular,alphabet
app.get("/sortprice", PizzaController.getSortPrice);
app.get("/sortraiting", PizzaController.getSortRaiting);
app.get("/sorttitle", PizzaController.getSortTitle);
//sort by price,popular,alphabet
//sort by CATEGORY/SORT NEW
app.get("/categorysort", PizzaController.getCategorySort);
//sort by CATEGORY/SORT NEW
//cart
app.post("/addPizza", CartController.addCart);
//cart

//USER//
app.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/user", UserController.getMe);
//ORDER//
app.post("/order", CartController.makeOrder);
app.get("/getorder", CartController.getOrder);
//ORDER//
const PORT = process.env.PORT || 4444;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
