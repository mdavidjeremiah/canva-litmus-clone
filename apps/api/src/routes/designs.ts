import { Router } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";
import type { Design, CreateDesignInput, UpdateDesignInput } from "@canva-clone/shared";

const router = Router();

// List all designs
router.get("/", async (_req, res) => {
  const designs = await prisma.design.findMany({
    orderBy: { updatedAt: "desc" },
  });

  const response = designs.map(
    (d) =>
      ({
        id: d.id,
        name: d.name,
        description: d.description || undefined,
        width: d.width,
        height: d.height,
        thumbnailUrl: d.thumbnail || undefined,
        elements: d.elements as Design["elements"],
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
        userId: d.userId || undefined,
      }) as Design
  );

  res.json({ designs: response, total: response.length, page: 1, pageSize: response.length });
});

// Get a design by ID
router.get("/:id", async (req, res, next) => {
  try {
    const design = await prisma.design.findUnique({
      where: { id: req.params.id },
    });

    if (!design) {
      throw new AppError(404, "Design not found");
    }

    const response: Design = {
      id: design.id,
      name: design.name,
      description: design.description || undefined,
      width: design.width,
      height: design.height,
      thumbnailUrl: design.thumbnail || undefined,
      elements: design.elements as Design["elements"],
      createdAt: design.createdAt,
      updatedAt: design.updatedAt,
      userId: design.userId || undefined,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Create a new design
router.post("/", async (req, res, next) => {
  try {
    const input: CreateDesignInput = req.body;

    const design = await prisma.design.create({
      data: {
        name: input.name,
        description: input.description,
        width: input.width,
        height: input.height,
        userId: input.userId,
        elements: [],
      },
    });

    const response: Design = {
      id: design.id,
      name: design.name,
      description: design.description || undefined,
      width: design.width,
      height: design.height,
      thumbnailUrl: design.thumbnail || undefined,
      elements: design.elements as Design["elements"],
      createdAt: design.createdAt,
      updatedAt: design.updatedAt,
      userId: design.userId || undefined,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// Update a design
router.put("/:id", async (req, res, next) => {
  try {
    const input: UpdateDesignInput = req.body;

    const design = await prisma.design.update({
      where: { id: req.params.id },
      data: {
        name: input.name,
        description: input.description,
        elements: input.elements,
      },
    });

    const response: Design = {
      id: design.id,
      name: design.name,
      description: design.description || undefined,
      width: design.width,
      height: design.height,
      thumbnailUrl: design.thumbnail || undefined,
      elements: design.elements as Design["elements"],
      createdAt: design.createdAt,
      updatedAt: design.updatedAt,
      userId: design.userId || undefined,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Delete a design
router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.design.delete({
      where: { id: req.params.id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as designsRouter };
