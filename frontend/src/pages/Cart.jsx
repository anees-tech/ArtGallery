"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Cart.css"

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    setCartItems(cart)

    // Calculate total price
    const total = cart.reduce((sum, item) => sum + item.painting.price * item.quantity, 0)
    setTotalPrice(total)
  }, [])

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return

    const updatedCart = [...cartItems]
    updatedCart[index].quantity = newQuantity

    // Update state and localStorage
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    // Recalculate total price
    const total = updatedCart.reduce((sum, item) => sum + item.painting.price * item.quantity, 0)
    setTotalPrice(total)
  }

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index)

    // Update state and localStorage
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    // Recalculate total price
    const total = updatedCart.reduce((sum, item) => sum + item.painting.price * item.quantity, 0)
    setTotalPrice(total)
  }

  const clearCart = () => {
    setCartItems([])
    setTotalPrice(0)
    localStorage.removeItem("cart")
  }

  const proceedToCheckout = () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"))

    if (!user) {
      // Redirect to login if not logged in
      navigate("/login")
    } else {
      // Proceed to checkout
      navigate("/checkout")
    }
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/gallery" className="btn">
              Browse Gallery
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <div className="cart-header">
                <div className="cart-header-item product">Product</div>
                <div className="cart-header-item price">Price</div>
                <div className="cart-header-item quantity">Quantity</div>
                <div className="cart-header-item total">Total</div>
                <div className="cart-header-item actions">Actions</div>
              </div>

              {cartItems.map((item, index) => (
                <div className="cart-item" key={index}>
                  <div className="cart-item-product">
                    <div className="cart-item-image">
                      <img
                        src={item.painting.imageUrl || "/placeholder.svg?height=80&width=80"}
                        alt={item.painting.title}
                      />
                    </div>
                    <div className="cart-item-details">
                      <h3 className="cart-item-title">
                        <Link to={`/painting/${item.painting._id}`}>{item.painting.title}</Link>
                      </h3>
                      <p className="cart-item-artist">by {item.painting.artist.name}</p>
                    </div>
                  </div>

                  <div className="cart-item-price">${item.painting.price.toFixed(2)}</div>

                  <div className="cart-item-quantity">
                    <div className="quantity-selector">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => updateQuantity(index, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-total">${(item.painting.price * item.quantity).toFixed(2)}</div>

                  <div className="cart-item-actions">
                    <button className="remove-btn" onClick={() => removeItem(index)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-row">
                <span className="summary-label">Subtotal:</span>
                <span className="summary-value">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Shipping:</span>
                <span className="summary-value">Free</span>
              </div>

              <div className="summary-row total-row">
                <span className="summary-label">Total:</span>
                <span className="summary-value">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="summary-actions">
                <button className="btn checkout-btn" onClick={proceedToCheckout}>
                  Proceed to Checkout
                </button>
                <button className="btn btn-secondary clear-btn" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
