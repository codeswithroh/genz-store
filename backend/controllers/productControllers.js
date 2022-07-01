const Product = require("../models/productModels");

// create products -- admin
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, product });
};

// update products -- admin
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, product });
};

// delete products -- admin
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }

  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
};

// get all products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
};

// get product by id
exports.getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }
  res.status(200).json({ success: true, product });
};
