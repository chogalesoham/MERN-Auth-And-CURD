const { createNewProduct } = require("../Controllers/product-controllers");
const Authenticate = require("../Middlewares/auth");
const { cloudinaryFileUploader } = require("../Middlewares/file-uploader");

const router = require("express").Router();

router.post(
  "/create-product",
  cloudinaryFileUploader.single("image"),
  createNewProduct
);

router.get("/products", Authenticate, (req, res) => {
  res.status(200).json([
    { name: "product1", price: 100 },
    { name: "product2", price: 200 },
    { name: "product3", price: 300 },
    { name: "product4", price: 400 },
  ]);
});

module.exports = router;
