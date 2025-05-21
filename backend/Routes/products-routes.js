const {
  createNewProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} = require("../Controllers/product-controllers");
const Authenticate = require("../Middlewares/auth");
const { cloudinaryFileUploader } = require("../Middlewares/file-uploader");

const router = require("express").Router();

router.post(
  "/create-product",
  cloudinaryFileUploader.single("image"),
  createNewProduct
);
router.put(
  "/update-product/:id",
  cloudinaryFileUploader.single("image"),
  updateProductById
);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.delete("/products/:id", deleteProductById);

module.exports = router;
