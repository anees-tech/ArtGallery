import express from "express"
import { getArtists, getArtistById, createArtist, updateArtist, deleteArtist } from "../controllers/artistController.js"

const router = express.Router()

router.get("/", getArtists)
router.get("/:id", getArtistById)
router.post("/", createArtist)
router.put("/:id", updateArtist)
router.delete("/:id", deleteArtist)

export default router
