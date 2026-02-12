import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { config } from "./config";
import { errorHandler } from "./middleware/errorHandler";
import { healthRouter } from "./routes/health";
import { designsRouter } from "./routes/designs";
import { assetsRouter } from "./routes/assets";

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "storage")));

// Routes
app.use("/health", healthRouter);
app.use("/api/designs", designsRouter);
app.use("/api/assets", assetsRouter);

// Error handling
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://${config.host}:${PORT}`);
});
