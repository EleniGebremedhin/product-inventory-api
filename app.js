const express = require("express");

const app = express();

const PORT = 3000;

// Import product routes
const productRoutes = require("./routes/productRoutes");

// Middleware
app.use(express.json());

// Connect product routes
app.use("/products", productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
