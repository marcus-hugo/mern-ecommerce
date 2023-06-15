import express from "express"
import products from "./data/products.js" // extesion required for own modules

const port = 5000
const app = express()

app.get("/", (req, res) => {
  res.send("API is running...")
})

app.get("/api/products", (req, res) => {
  res.send(products)
})

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
})

app.listen(port, () => console.log(`Server started on port ${port}.`))
