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
  Favourite.findOne({ user: req.body.user })
    .populate("product")
    .then((favourites) => {
      res.json(favourites);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.addToFavourite = async (req, res, next) => {
  try {
    let favourite = await Favourite.findOne({ user: req.body.user });

    // Check if the user has a favourite document created
    if (favourite) {
      // Check if the product was already in favourites list
      const exists = favourite.product.find((fav) => fav == req.body.productId);

      if (!exists) {
        // Add product id to product field then save
        favourite.product.push(req.body.productId);

        await favourite.save();
        res.send(favourite);
      } else {
        const error = new Error("Product is already in your favourites list.");
        error.statusCode = 400;
        next(error);
      }

      return;
    }

    // If there is no favourite create one
    const newFavourite = {
      user: req.body.user,
      products: [req.body.productId],
    };

    favourite = new Favourite(newFavourite);

    await favourite.save();

    res.send(favourite);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.removeFromFavourite = (req, res, next) => {
  Favourite.findOneAndUpdate(
    { user: req.body.user },
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

// To create favourite from scratch
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
