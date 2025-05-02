"use client"

import { useState, useEffect } from "react"
import PaintingCard from "../components/PaintingCard"
import "./Gallery.css"

const Gallery = () => {
  const [paintings, setPaintings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    sortBy: "newest",
  })

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/paintings")
        if (!response.ok) {
          throw new Error("Failed to fetch paintings")
        }
        const data = await response.json()
        setPaintings(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchPaintings()
  }, [])

  // Extract unique categories from paintings
  const categories = ["all", ...new Set(paintings.map((painting) => painting.category))]

  // Filter and sort paintings based on user selection
  const filteredPaintings = paintings.filter((painting) => {
    // Filter by category
    if (filters.category !== "all" && painting.category !== filters.category) {
      return false
    }

    // Filter by price range
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number)
      if (max) {
        if (painting.price < min || painting.price > max) return false
      } else {
        if (painting.price < min) return false
      }
    }

    return true
  })

  // Sort paintings
  const sortedPaintings = [...filteredPaintings].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt)
      case "newest":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="gallery-page">
      <div className="container">
        <h1 className="page-title">Art Gallery</h1>
        <p className="page-subtitle">Explore our collection of unique paintings from talented artists</p>

        <div className="gallery-filters">
          <div className="filter-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="filter-select"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="priceRange">Price Range:</label>
            <select
              id="priceRange"
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="all">All Prices</option>
              <option value="0-500">$0 - $500</option>
              <option value="500-1000">$500 - $1000</option>
              <option value="1000-5000">$1000 - $5000</option>
              <option value="5000">$5000+</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sortBy">Sort By:</label>
            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading paintings...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : sortedPaintings.length === 0 ? (
          <div className="no-paintings">
            <p>No paintings match your filters. Please try different criteria.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {sortedPaintings.map((painting) => (
              <PaintingCard key={painting._id} painting={painting} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Gallery
