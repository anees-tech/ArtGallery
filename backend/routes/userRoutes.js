import express from "express"
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  getUsers,
  updateUserStatus
} from "../controllers/userController.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", getUserProfile)
router.put("/profile", updateUserProfile)
router.get("/", getUsers)
router.put("/:id", updateUserStatus) 

export default router
