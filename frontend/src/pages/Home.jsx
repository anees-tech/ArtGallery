"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PaintingCard from "../components/PaintingCard"
import "./Home.css"

const Home = () => {
  const [featuredPaintings, setFeaturedPaintings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeaturedPaintings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/paintings/featured")
        if (!response.ok) {
          throw new Error("Failed to fetch featured paintings")
        }
        const data = await response.json()
        setFeaturedPaintings(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchFeaturedPaintings()
  }, [])

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Discover Beautiful Artwork</h1>
            <p className="hero-subtitle">
              Explore our collection of unique paintings from talented artists around the world
            </p>
            <div className="hero-buttons">
              <Link to="/gallery" className="btn">
                Browse Gallery
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Paintings</h2>
          <p className="section-subtitle">Discover our handpicked selection of exceptional artwork</p>

          {loading ? (
            <div className="loading">Loading featured paintings...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="featured-grid">
              {featuredPaintings.map((painting) => (
                <PaintingCard key={painting._id} painting={painting} />
              ))}
            </div>
          )}

          <div className="view-all-container">
            <Link to="/gallery" className="btn">
              View All Paintings
            </Link>
          </div>
        </div>
      </section>

      <section className="about-preview-section">
        <div className="container">
          <div className="about-preview-content">
            <div className="about-preview-text">
              <h2 className="section-title">About Our Gallery</h2>
              <p>
                Our art gallery serves as a platform for artists and art enthusiasts, dedicated to showcasing various
                types of paintings for sale and display. We provide a diverse art gallery where users can explore
                various paintings, learn about the artists, and purchase artwork online.
              </p>
              <Link to="/about" className="btn">
                Learn More
              </Link>
            </div>
            <div className="about-preview-image">
              <img src="/placeholder.svg?height=400&width=600" alt="Art Gallery" />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Start Your Art Collection?</h2>
          <p className="cta-subtitle">Join our community of art lovers and discover your next favorite piece</p>
          <Link to="/register" className="btn cta-button">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
