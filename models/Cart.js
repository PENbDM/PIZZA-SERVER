import mongoose from "mongoose";
import Pizza from "./Pizza.js";
const CartSchema = new mongoose.Schema({
  order: [
    {
      pizza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizza", // Это ссылка на схему Pizza
        required: true,
      },

      title: {
        type: String,
        required: true,
      },
      types: {
        type: Number,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});
export default mongoose.model("Cart", CartSchema);
