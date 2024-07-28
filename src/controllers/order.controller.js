const dayjs = require("dayjs");
const Order = require("../models/order");
const logger = require("../utils/logger")("order.controller");

exports.getAllOrders = (req, res, next) => {
  Order.find()
    .populate("products")
    .populate("user")
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
  Order.find({ user: req.body.user })
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

exports.searchByDate = (req, res, next) => {
  const { date } = req.query;

  const searchDate = new Date(date);
  searchDate.setHours(0, 0, 0, 0);

  const endDate = new Date(searchDate);
  endDate.setHours(23, 59, 59, 99);

  Order.find({ createdAt: { $gt: searchDate, $lt: endDate } })
    .then((order) => {
      res.json(order);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.search = (req, res, next) => {
  const { findBy, value } = req.query;
  Order.find()
    .populate({
      path: "user",
      match: { [findBy]: { $regex: new RegExp(value, "i") } },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.filterByPage = (req, res, next) => {
  const { page, limit } = req.query;

  Order.find({})
    .skip(limit * (page - 1))
    .limit(limit)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.analysis = (req, res, next) => {
  const { type, status } = req.query;

  const now = dayjs();
  let start, end;

  if (type === "past30Days") {
    start = now.subtract(1, "month").startOf("day");
    end = now.endOf("day");
  } else if (type === "month") {
    // This month
    start = now.startOf("month");
    end = now.endOf("month");
  }

  Order.find({ createdAt: { $lt: end, $gt: start }, status })
    .then((result) => {
      const total = result.reduce((acc, order) => acc + order.total, 0) / 100;
      res.json({ orders: result.length, total });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
