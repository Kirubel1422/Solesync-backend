const Product = require("../models/product");
const logger = require("../utils/logger")("product.controller");

exports.getTotalProducts = (req, res, next) => {
  Product.countDocuments()
    .then((total) => res.json({ total }))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

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

exports.search = (req, res, next) => {
  const { findBy, value } = req.query;

  Product.find({ [findBy]: { $regex: new RegExp(value, "i") } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
exports.getPopularProducts = (req, res, next) => {
  const { page, limit } = req.query;
  const skipCount = Math.abs((page - 1) * limit);

  Product.find()
    .sort({ sold: -1 })
    .skip(skipCount)
    .limit(limit)
    .then((products) => res.json(products))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
