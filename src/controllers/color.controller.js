const Color = require("../models/color");
const logger = require("../utils/logger")("color.controller");

exports.getAllColors = (req, res, next) => {
  Color.find()
    .then((colors) => res.json(colors))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getColorById = (req, res, next) => {
  Color.findById(req.params.id)
    .then((color) => res.json(color))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.createColor = (req, res, next) => {
  Color.create(req.body)
    .then((color) => res.status(201).json(color))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.updateColor = (req, res, next) => {
  Color.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((color) => res.json(color))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.deleteColor = (req, res, next) => {
  Color.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
