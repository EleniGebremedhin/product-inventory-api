# Product Inventory REST API

A RESTful Product Inventory API built using Node.js and Express.js
for the Nexus Backend project.

## Features

- Get all products
- Get a product by ID
- Create a new product
- Update an existing product
- Delete a product
- Search products by name
- Filter products by category
- Filter products by price
- Find low-stock products
- Calculate total inventory value
- Validate product data
- Handle errors with appropriate HTTP status codes

## Technologies Used

- Node.js
- Express.js
- JavaScript
- Postman

## Project Structure

product-inventory-api/
- app.js
- package.json
- package-lock.json
- README.md
- controllers/
  - productController.js
- data/
  - products.js
- routes/
  - productRoutes.js

## Installation

1. Clone the repository:

   git clone https://github.com/EleniGebremedhin/product-inventory-api.git

2. Navigate into the project:

   cd product-inventory-api

3. Install dependencies:

   npm install

4. Start the server:

   node app.js

The server runs at:

http://localhost:3000

## API Endpoints

### CRUD Operations

| Method | Endpoint | Description |
|---|---|---|
| GET | /products | Get all products |
| GET | /products/:id | Get product by ID |
| POST | /products | Create a product |
| PUT | /products/:id | Update a product |
| DELETE | /products/:id | Delete a product |

### Bonus Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /products/search?name=laptop | Search by name |
| GET | /products/category/Electronics | Filter by category |
| GET | /products/price/100 | Find products below a price |
| GET | /products/low-stock | Find products with quantity below 5 |
| GET | /products/value | Calculate total inventory value |

## Product Structure

Each product contains:

- id
- name
- price
- quantity
- category

## Validation

The API validates product data before creating or updating products.

- Name is required.
- Price must be a positive number.
- Quantity must be zero or greater.
- Category is required.
- Empty request bodies are rejected.

Invalid product data returns:

{
  "message": "Validation failed"
}

## Error Handling

The API uses appropriate HTTP status codes:

- 200: Successful request
- 201: Product created
- 400: Invalid request
- 404: Product not found

## Data Storage

This project uses a JavaScript array to store products.
No external database is used.

Note: Product changes are stored in memory and reset
when the server restarts.

## Testing

All API endpoints can be tested using Postman.

## Author

Eleni Gebremedhin

GitHub: https://github.com/EleniGebremedhin