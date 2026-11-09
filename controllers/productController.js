const products = require("../data/products");
// Validate product data
const validateProduct = (req, res) => {
  const { name, price, quantity, category } = req.body;

  if (
    !req.body ||
    Object.keys(req.body).length === 0 ||
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price <= 0 ||
    typeof quantity !== "number" ||
    !Number.isFinite(quantity) ||
    quantity < 0 ||
    typeof category !== "string" ||
    category.trim() === ""
  ) {
    res.status(400).json({
      message: "Validation failed",
    });

    return false;
  }

  return true;
};

// 1. Get all products
const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

// 2. Get product by ID
const getProductById = (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json(product);
};
// 3. Create a new product
const createProduct = (req, res) => {
  if (!validateProduct(req, res)) {
    return;
  }
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
};
// 4. Update a product
const updateProduct = (req, res) => {
  if (!validateProduct(req, res)) {
    return;
  }
  const id = parseInt(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.name = req.body.name;
  product.price = req.body.price;
  product.quantity = req.body.quantity;
  product.category = req.body.category;

  res.status(200).json(product);
};

// 5. Delete a product
const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  products.splice(index, 1);

  res.status(200).json({
    message: "Product deleted successfully",
  });
};
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
