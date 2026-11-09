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
// 6. Search products by name
const searchProductsByName = (req, res) => {
  const searchName = req.query.name;

  if (!searchName || searchName.trim() === "") {
    return res.status(400).json({
      message: "Search name is required",
    });
  }

  const results = products.filter((p) =>
    p.name.toLowerCase().includes(searchName.toLowerCase()),
  );

  res.status(200).json(results);
};
// 7. Get products by category
const getProductsByCategory = (req, res) => {
  const category = req.params.category;

  const results = products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  );

  res.status(200).json(results);
};
// 8. Get products below a price
const getProductsByPrice = (req, res) => {
  const maxPrice = Number(req.params.price);

  if (isNaN(maxPrice) || maxPrice <= 0) {
    return res.status(400).json({
      message: "Invalid price",
    });
  }

  const results = products.filter((p) => p.price < maxPrice);

  res.status(200).json(results);
};
const getLowStockProducts = (req, res) => {
  const results = products.filter((p) => p.quantity < 5);

  res.status(200).json(results);
};
// 10. Calculate total inventory value
const getTotalInventoryValue = (req, res) => {
  const totalValue = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  res.status(200).json({
    totalInventoryValue: totalValue,
  });
};
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductsByName,
  getProductsByCategory,
  getProductsByPrice,
  getLowStockProducts,
  getTotalInventoryValue,
};
