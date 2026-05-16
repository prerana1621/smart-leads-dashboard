import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);

app.get("/", (_, res) => {
  res.send("API is running");
});

app.use(errorHandler);

export default app;
