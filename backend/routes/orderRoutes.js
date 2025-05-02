import express from "express"
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js"

const router = express.Router()

router.post("/", createOrder)
router.get("/", getOrders)
router.get("/:id", getOrderById)
router.put("/:id/pay", updateOrderToPaid)
router.put("/:id/deliver", updateOrderToDelivered)

export default router
