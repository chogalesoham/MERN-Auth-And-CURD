const productModel = require("../Models/product-model");

//POST- create new product
const createNewProduct = async (req, res) => {
  try {
    const body = req.body;
    body.image = req.file ? req.file?.path : null;
    const product = new productModel(body);
    await product.save();
    res.status(201).json({
      success: true,
      message: "product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// PUT - Update Product By Id
const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    let updatedProductData = { name, description, price };
    if (req.file) {
      updatedProductData.image = req.file.path;
    }
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updatedProductData,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Product Updated",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//GET - all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res
      .status(200)
      .json({ success: true, message: "all products", data: products });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//GET - Get product by id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      res.status(404).json({ success: false, message: "Product Not Found" });
    }
    res
      .status(200)
      .json({ success: true, message: "get product by Id", data: product });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//DELETE - delete product by id
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ success: false, message: "Product Not Found" });
    }
    res.status(200).json({
      success: true,
      message: "Product Deleted Successful",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};
