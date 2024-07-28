const Cart = require("../models/cart");
const logger = require("../utils/logger")("cart.controller");

exports.getAllCarts = (req, res, next) => {
  Cart.find()
    .then((carts) => res.json(carts))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getCartById = (req, res, next) => {
  Cart.findById(req.params.id)
    .populate("products")
    .then((cart) => res.json(cart))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getCartByUserId = (req, res, next) => {
  Cart.findOne({ user: req.params.userId })
    .populate("products")
    .then((cart) => res.json(cart))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getSelfCart = (req, res, next) => {
  Cart.find({ user: req.body.user })
    .populate("products")
    .then((cart) => res.json(cart))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.createCart = (req, res, next) => {
  Cart.create(req.body)
    .then((cart) => res.status(201).json(cart))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.updateCart = (req, res, next) => {
  Cart.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((cart) => res.json(cart))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.deleteCart = (req, res, next) => {
  Cart.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.addProductToCart = (req, res, next) => {
  Cart.findOneAndUpdate(
    { user: req.body.user },
    { $push: { products: req.body.products } },
    { new: true }
  )
    .then((cart) => res.json(cart))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.removeProductFromCart = (req, res, next) => {
  Cart.findOneAndUpdate(
    { user: req.body.user },
    { $pull: { products: req.body.products } },
    { new: true }
  )
    .then((cart) => {
      res.json(cart);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
