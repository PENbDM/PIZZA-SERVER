import mongoose from "mongoose";

const PizzaSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Pizza", PizzaSchema);
