const Category = require("../models/category");
const logger = require("../utils/logger")("category.controller");

exports.getAllCategories = (req, res, next) => {
  Category.find()
    .then((categories) => res.json(categories))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getCategoryById = (req, res, next) => {
  Category.findById(req.params.id)
    .then((category) => res.json(category))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.createCategory = (req, res, next) => {
  Category.create(req.body)
    .then((category) => res.status(201).json(category))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.updateCategory = (req, res, next) => {
  Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((category) => res.json(category))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.deleteCategory = (req, res, next) => {
  Category.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
