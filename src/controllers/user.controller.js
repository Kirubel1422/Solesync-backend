const User = require("../models/user");
const { authValidator } = require("../utils/validator");
const logger = require("../utils/logger")("user.controller");

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.createUser = (req, res, next) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => res.json(user))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
