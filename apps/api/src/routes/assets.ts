import { Router } from "express";
import multer from "multer";
import { prisma } from "../lib/prisma";
import { storageService } from "../services/storageService";
import { AppError } from "../middleware/errorHandler";
import { config } from "../config";
import type { Asset } from "@canva-clone/shared";

const router = Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: config.upload.maxFileSize },
  fileFilter: (req, file, cb) => {
    if (config.upload.allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

// Upload an asset
router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError(400, "No file uploaded");
    }

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;

    // Store the file
    const url = await storageService.store(fileName, file.buffer, file.mimetype);

    // Save to database
    const asset = await prisma.asset.create({
      data: {
        name: fileName,
        mimeType: file.mimetype,
        size: file.size,
        url,
        userId: req.body.userId,
      },
    });

    const response: Asset = {
      id: asset.id,
      name: asset.name,
      mimeType: asset.mimeType,
      size: asset.size,
      url: asset.url,
      createdAt: asset.createdAt,
      userId: asset.userId || undefined,
    };

    res.status(201).json({ asset: response, url });
  } catch (error) {
    next(error);
  }
});

// Get an asset by ID
router.get("/:id", async (req, res, next) => {
  try {
    const asset = await prisma.asset.findUnique({
      where: { id: req.params.id },
    });

    if (!asset) {
      throw new AppError(404, "Asset not found");
    }

    const response: Asset = {
      id: asset.id,
      name: asset.name,
      mimeType: asset.mimeType,
      size: asset.size,
      url: asset.url,
      createdAt: asset.createdAt,
      userId: asset.userId || undefined,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export { router as assetsRouter };
