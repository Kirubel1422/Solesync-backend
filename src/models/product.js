const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    colors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Color",
        required: true,
      },
    ],
    sizes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Size",
        required: true,
      },
    ],
    images: [
      {
        type: String,
        required: true,
      },
    ],
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
