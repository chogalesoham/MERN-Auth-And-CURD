const productModel = require("../Models/product-model");

//POST- create new product
const createNewProduct = async (req, res) => {
  try {
    const body = req.body;
    body.image = req.file ? req.file?.path : null;
    const product = new productModel(body);
    await product.save();
    res.status(201).json({ message: "product created successfully", product });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { createNewProduct };
