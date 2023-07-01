import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const port = process.env.PORT || 5000
connectDB()
const app = express()

app.get("/", (req, res) => {
  res.send("API is running...")
})

// Api Routes
app.use("/api/products", productRoutes)

// User Routes
app.use("/api/users", userRoutes)

// Middleware
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}.`))
