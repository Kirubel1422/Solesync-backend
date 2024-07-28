const { Schema, model } = require("mongoose");

const colorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
      timestamps: true,
    },
  }
);

module.exports = model("Color", colorSchema);
