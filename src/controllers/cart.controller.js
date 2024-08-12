const Cart = require("../models/cart");
const Product = require("../models/product");
const Size = require("../models/size");
const Color = require("../models/color");
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

// This is to increment the quantity of a product in the cart
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

const inStock = async (productId, existingQuantity, newQuantity) => {
  const product = await Product.findById(productId);
  return product.stock >= existingQuantity + newQuantity;
};

exports.addProductToCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.body.user });
    if (!cart) {
      cart = new Cart(req.body);
    } else {
      // Iterate over each product in the request body
      for (const productFromBody of req.body.products) {
        // Try to find an existing item in the cart that matches the current product
        let existingItem = cart.products.find(
          (item) =>
            item.product.toString() === productFromBody.product &&
            item.color.toString() === productFromBody.color &&
            item.size.toString() === productFromBody.size
        );

        if (existingItem) {
          const instock = await inStock(
            existingItem.product,
            existingItem.quantity,
            productFromBody.quantity
          );

          if (instock) {
            existingItem.quantity += productFromBody.quantity;
          } else {
            // Generate custom error
            const error = new Error("Not enough in stock");
            error.status = 400;
            throw error;
          }
        } else {
          // If not found, add the new product to the cart
          cart.products.push(productFromBody);
        }
      }
    }

    // Save the updated cart
    await cart.save();
    res.json(cart);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.getCartDetail = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.body.user });
    const { products } = cart;

    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        const productDetail = await Product.findById(product.product);
        const colorDetail = await Color.findById(product.color);
        const sizeDetail = await Size.findById(product.size);

        return {
          product: productDetail,
          color: colorDetail,
          size: sizeDetail,
          quantity: product.quantity,
        };
      })
    );
    const updatedCart = {
      ...cart._doc,
      products: updatedProducts,
    };

    updatedCart.id = updatedCart._id;

    delete updatedCart._id;
    delete updatedCart.__v;

    res.json(updatedCart);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.incrementItem = async (req, res, next) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findById(req.params.id);
    const existingProduct = cart.products.find(
      (prod) => prod.product == productId
    );

    // Check if incrementing is valid
    const incrementBy = 1;
    const instock = await inStock(
      productId,
      existingProduct.quantity,
      incrementBy
    );

    // instock = true increment else throw error
    if (instock) {
      existingProduct.quantity += incrementBy;
    } else {
      const error = new Error("Out of stock");
      throw error;
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.decrementItem = async (req, res, next) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findById(req.params.id);
    cart.products.find((prod) => prod.product == productId).quantity -= 1;
    await cart.save();
    res.json(cart);
  } catch (error) {
    logger.error(error);
    next(error);
  }
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
