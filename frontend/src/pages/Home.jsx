"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PaintingCard from "../components/PaintingCard"
import "./Home.css"

// Dummy featured paintings data
const dummyFeaturedPaintings = [
  {
    _id: "1",
    title: "Autumn Landscape",
    artist: {
      _id: "a1", 
      name: "Emma Johnson"
    },
    price: 1200,
    medium: "Oil on Canvas",
    imageUrl: "/images/paintings/autumn-landscape.jpg",
    featured: true
  },
  {
    _id: "2",
    title: "Abstract Harmony",
    artist: {
      _id: "a2", 
      name: "Marcus Chen"
    },
    price: 950,
    medium: "Acrylic on Canvas",
    imageUrl: "/images/paintings/abstract-harmony.jpg",
    featured: true
  },
  {
    _id: "3",
    title: "Coastal Dreams",
    artist: {
      _id: "a3", 
      name: "Sarah Wilson"
    },
    price: 1450,
    medium: "Oil on Canvas",
    imageUrl: "/images/paintings/coastal-dreams.jpg",
    featured: true
  },
  {
    _id: "4",
    title: "Urban Nights",
    artist: {
      _id: "a4", 
      name: "David Miller"
    },
    price: 1100,
    medium: "Mixed Media",
    imageUrl: "/images/paintings/urban-nights.jpg",
    featured: true
  }
];

const Home = () => {
  const [featuredPaintings, setFeaturedPaintings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with a timeout
    const timer = setTimeout(() => {
      setFeaturedPaintings(dummyFeaturedPaintings);
      setLoading(false);
    }, 500); // 500ms delay to simulate loading

    return () => clearTimeout(timer);
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
