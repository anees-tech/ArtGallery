import Order from "../models/orderModel.js"

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error("No order items")
    }

    // In a real app, you would get the user ID from the auth middleware
    const userId = req.body.userId

    const order = new Order({
      user: userId,
      orderItems: orderItems.map((item) => ({
        painting: item.paintingId,
        price: item.price,
      })),
      shippingAddress,
      paymentMethod,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate({
        path: "orderItems.painting",
        select: "title imageUrl artist",
        populate: {
          path: "artist",
          select: "name",
        },
      })

    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error("Order not found")
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error("Order not found")
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error("Order not found")
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name")
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
