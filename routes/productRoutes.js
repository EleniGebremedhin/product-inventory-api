const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

// GET all products
router.get("/", productController.getAllProducts);
// GET products by name
router.get("/search", productController.searchProductsByName);
// GET products by category
router.get("/category/:category", productController.getProductsByCategory);
// GET products below a price
router.get("/price/:price", productController.getProductsByPrice);
// GET low-stock products
router.get("/low-stock", productController.getLowStockProducts);
// GET total inventory value
router.get("/value", productController.getTotalInventoryValue);

// GET product by ID
router.get("/:id", productController.getProductById);

// POST a new product
router.post("/", productController.createProduct);

// PUT update a product
router.put("/:id", productController.updateProduct);

// DELETE a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
