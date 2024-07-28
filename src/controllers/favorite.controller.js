const Favourite = require("../models/favourite");
const logger = require("../utils/logger")("favourite.controller");

exports.getAllFavourites = (req, res, next) => {
  Favourite.find()
    .then((favourites) => res.json(favourites))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getSelfFavourite = (req, res, next) => {
  Favourite.find({ userId: req.body.userId })
    .then((favourites) => res.json(favourites))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.addToFavourite = (req, res, next) => {
  Favourite.findOneAndUpdate(
    { userId: req.body.userId },
    { $push: { product: req.body.productId } },
    { new: true }
  )
    .then((favourite) => res.json(favourite))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.removeFromFavourite = (req, res, next) => {
  Favourite.findOneAndUpdate(
    { userId: req.body.userId },
    { $pull: { product: req.body.productId } },
    { new: true }
  )
    .then((favourite) => res.json(favourite))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getFavouriteById = (req, res, next) => {
  Favourite.findById(req.params.id)
    .then((favourite) => res.json(favourite))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.createFavourite = (req, res, next) => {
  console.log(req.body);
  Favourite.create(req.body)
    .then((favourite) => res.status(201).json(favourite))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.updateFavourite = (req, res, next) => {
  Favourite.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((favourite) => res.json(favourite))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.deleteFavourite = (req, res, next) => {
  Favourite.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
