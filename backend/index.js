import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
// import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();
const corsOrigin = {
  origin: "https://mern-rental-app-vercel.vercel.app/", //front end port
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOrigin));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// app.use('/api/products', productRoutes)
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/items", itemRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
