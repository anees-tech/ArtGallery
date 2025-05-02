import express from "express"
import {
  getExhibitions,
  getExhibitionById,
  createExhibition,
  updateExhibition,
  deleteExhibition,
} from "../controllers/exhibitionController.js"

const router = express.Router()

router.get("/", getExhibitions)
router.get("/:id", getExhibitionById)
router.post("/", createExhibition)
router.put("/:id", updateExhibition)
router.delete("/:id", deleteExhibition)

export default router
