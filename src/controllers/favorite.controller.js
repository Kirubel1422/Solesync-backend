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

exports.getUserFavorites = (req, res, next) => {
  Favourite.find({ user: req.body.userId })
    .then((favourites) => res.json(favourites))
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
