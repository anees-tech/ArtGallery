"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./PaintingDetail.css"

const PaintingDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [painting, setPainting] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchPainting = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/paintings/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch painting details")
        }
        const data = await response.json()
        setPainting(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchPainting()
  }, [id])

  const addToCart = () => {
    // Get existing cart from localStorage or initialize empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || []

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex((item) => item.painting._id === painting._id)

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cart[existingItemIndex].quantity += quantity
    } else {
      // Add new item to cart
      cart.push({
        painting: {
          _id: painting._id,
          title: painting.title,
          price: painting.price,
          imageUrl: painting.imageUrl,
          artist: painting.artist,
        },
        quantity: quantity,
      })
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart))

    // Navigate to cart page
    navigate("/cart")
  }

  if (loading) {
    return <div className="loading">Loading painting details...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!painting) {
    return <div className="error">Painting not found</div>
  }

  return (
    <div className="painting-detail-page">
      <div className="container">
        <div className="painting-detail-container">
          <div className="painting-detail-image">
            <img src={painting.imageUrl || "/placeholder.svg?height=600&width=600"} alt={painting.title} />
          </div>
          <div className="painting-detail-info">
            <h1 className="painting-detail-title">{painting.title}</h1>
            <p className="painting-detail-artist">
              by <span>{painting.artist.name}</span>
            </p>

            <div className="painting-detail-meta">
              <div className="meta-item">
                <span className="meta-label">Medium:</span>
                <span className="meta-value">{painting.medium}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Year:</span>
                <span className="meta-value">{painting.year}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Dimensions:</span>
                <span className="meta-value">
                  {painting.dimensions.width} × {painting.dimensions.height} cm
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{painting.category}</span>
              </div>
            </div>

            <div className="painting-detail-price">
              <span className="price-label">Price:</span>
              <span className="price-value">${painting.price.toFixed(2)}</span>
            </div>

            <div className="painting-detail-description">
              <h3>Description</h3>
              <p>{painting.description}</p>
            </div>

            {painting.inStock ? (
              <div className="painting-detail-actions">
                <div className="quantity-selector">
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button className="quantity-btn" onClick={() => setQuantity((prev) => prev + 1)}>
                    +
                  </button>
                </div>
                <button className="btn add-to-cart-btn" onClick={addToCart}>
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className="out-of-stock">
                <p>This painting is currently not available</p>
              </div>
            )}
          </div>
        </div>

        <div className="artist-info-section">
          <h2>About the Artist</h2>
          <div className="artist-info-container">
            <div className="artist-image">
              <img
                src={painting.artist.imageUrl || "/placeholder.svg?height=200&width=200"}
                alt={painting.artist.name}
              />
            </div>
            <div className="artist-bio">
              <h3>{painting.artist.name}</h3>
              <p>{painting.artist.biography}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaintingDetail
