import express from "express";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
app.use(cookieParser());
const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running in ${ENV.NODE_ENV} mode on port ${PORT}`);
  connectDB();
});
