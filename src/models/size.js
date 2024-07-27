const { Schema, model } = require("mongoose");

const sizeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
      timestamps: true,
    },
  }
);

module.exports = model("Size", sizeSchema);
