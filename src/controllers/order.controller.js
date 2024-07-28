const Order = require("../models/order");
const logger = require("../utils/logger")("order.controller");

exports.getAllOrders = (req, res, next) => {
  Order.find()
    .populate("products")
    .then((orders) => res.json(orders))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getOrderById = (req, res, next) => {
  Order.findById(req.params.id)
    .populate("products")
    .then((order) => res.json(order))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getSelfOrder = (req, res, next) => {
  Order.find({ userId: req.body.userId })
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.createOrder = (req, res, next) => {
  Order.create(req.body)
    .then((order) => res.status(201).json(order))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.updateOrder = (req, res, next) => {
  Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate("products")
    .then((order) => res.json(order))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.deleteOrder = (req, res, next) => {
  Order.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
