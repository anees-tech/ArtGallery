"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Checkout.css"

const Checkout = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "creditCard",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) {
      navigate("/login")
      return
    }

    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    if (cart.length === 0) {
      navigate("/cart")
      return
    }

    setCartItems(cart)

    // Calculate total price
    const total = cart.reduce((sum, item) => sum + item.painting.price * item.quantity, 0)
    setTotalPrice(total)

    // Pre-fill email if available
    if (user.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
      }))
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Get user ID from localStorage
      const user = JSON.parse(localStorage.getItem("user"))

      // Prepare order data
      const orderData = {
        userId: user._id,
        orderItems: cartItems.map((item) => ({
          paintingId: item.painting._id,
          quantity: item.quantity,
          price: item.painting.price,
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        totalPrice: totalPrice,
      }

      // Send order to backend
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order")
      }

      // Clear cart after successful order
      localStorage.removeItem("cart")
      setOrderPlaced(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your purchase. Your order has been received and is being processed.</p>
            <button className="btn" onClick={() => navigate("/")}>
              Return to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        {error && <div className="checkout-error">{error}</div>}

        <div className="checkout-content">
          <div className="checkout-form-container">
            <h2 className="checkout-section-title">Shipping Information</h2>
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className="form-control"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="form-control"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>

              <h2 className="checkout-section-title">Payment Method</h2>

              <div className="payment-methods">
                <div className="payment-method">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    value="creditCard"
                    checked={formData.paymentMethod === "creditCard"}
                    onChange={handleChange}
                  />
                  <label htmlFor="creditCard">Credit Card</label>
                </div>

                <div className="payment-method">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === "paypal"}
                    onChange={handleChange}
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>

                <div className="payment-method">
                  <input
                    type="radio"
                    id="bankTransfer"
                    name="paymentMethod"
                    value="bankTransfer"
                    checked={formData.paymentMethod === "bankTransfer"}
                    onChange={handleChange}
                  />
                  <label htmlFor="bankTransfer">Bank Transfer</label>
                </div>
              </div>

              <button type="submit" className="btn place-order-btn" disabled={loading}>
                {loading ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h2 className="checkout-section-title">Order Summary</h2>

            <div className="order-items">
              {cartItems.map((item, index) => (
                <div className="order-item" key={index}>
                  <div className="order-item-image">
                    <img
                      src={item.painting.imageUrl || "/placeholder.svg?height=60&width=60"}
                      alt={item.painting.title}
                    />
                  </div>
                  <div className="order-item-details">
                    <h3 className="order-item-title">{item.painting.title}</h3>
                    <p className="order-item-artist">by {item.painting.artist.name}</p>
                  </div>
                  <div className="order-item-quantity">x{item.quantity}</div>
                  <div className="order-item-price">${(item.painting.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="order-total-row">
                <span className="total-label">Subtotal:</span>
                <span className="total-value">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="order-total-row">
                <span className="total-label">Shipping:</span>
                <span className="total-value">Free</span>
              </div>
              <div className="order-total-row grand-total">
                <span className="total-label">Total:</span>
                <span className="total-value">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
