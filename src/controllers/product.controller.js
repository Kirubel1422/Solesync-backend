const Product = require("../models/product");
const logger = require("../utils/logger")("product.controller");

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .populate("colors")
    .populate("sizes")
    .populate("category")
    .then((products) => res.json(products))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getProductById = (req, res, next) => {
  Product.findById(req.params.id)
    .populate("colors")
    .populate("sizes")
    .populate("category")
    .then((product) => res.json(product))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.createProduct = (req, res, next) => {
  Product.create(req.body)
    .then((product) => res.status(201).json(product))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.updateProduct = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((product) => res.json(product))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};