import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    pizzas: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza",
          required: true,
        },
        sizes: {
          type: Number,
          required: true,
        },
        types: {
          type: String,
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
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
// const orderSchema = new mongoose.Schema(
//   {
//     pizza: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Pizza", // Это ссылка на схему Pizza
//         required: true,
//       },
//     ],
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// export default mongoose.model("Order", orderSchema);
