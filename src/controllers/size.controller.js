const Size = require("../models/size");
const logger = require("../utils/logger")("size.controller");

exports.getAllSizes = (req, res, next) => {
  Size.find()
    .then((sizes) => res.json(sizes))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getSizeById = (req, res, next) => {
  Size.findById(req.params.id)
    .then((size) => res.json(size))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.createSize = (req, res, next) => {
  Size.create(req.body)
    .then((size) => res.status(201).json(size))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.updateSize = (req, res, next) => {
  Size.findByIdAndUpdate(req.params.id, req.body, { new: true })

    .then((size) => res.json(size))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.deleteSize = (req, res, next) => {
  Size.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
