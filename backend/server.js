import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import paintingRoutes from "./routes/paintingRoutes.js"
import artistRoutes from "./routes/artistRoutes.js"
import exhibitionRoutes from "./routes/exhibitionRoutes.js"
import feedbackRoutes from "./routes/feedbackRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js"

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/users", userRoutes)
app.use("/api/paintings", paintingRoutes)
app.use("/api/artists", artistRoutes)
app.use("/api/exhibitions", exhibitionRoutes)
app.use("/api/feedback", feedbackRoutes)
app.use("/api/orders", orderRoutes)

// Error handling middleware
app.use(errorHandler)

// Connect to MongoDB and start server
mongoose
  .connect("mongodb+srv://hello:hello123@restaurant.8j8yw.mongodb.net/ArtGallery")
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
  })
