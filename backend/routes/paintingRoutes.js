import express from "express"
import {
  getPaintings,
  getPaintingById,
  createPainting,
  updatePainting,
  deletePainting,
  getFeaturedPaintings,
} from "../controllers/paintingController.js"

const router = express.Router()

router.get("/", getPaintings)
router.get("/featured", getFeaturedPaintings)
router.get("/:id", getPaintingById)
router.post("/", createPainting)
router.put("/:id", updatePainting)
router.delete("/:id", deletePainting)

export default router
