import express from "express";
import mongoose from "mongoose";
import ducksRoutes from "./routes/ducks.js";
import shippingRoutes from "./routes/shipping.js";

const app = express();
app.use(express.json());

// connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ducksdb");

// routes
app.use("/ducks", ducksRoutes);
app.use("/shipping", shippingRoutes);

// start server
app.listen(3000, () => console.log("API running on http://localhost:3000"));
