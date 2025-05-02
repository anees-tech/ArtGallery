"use client"

import { useState, useEffect } from "react"
import "./Exhibitions.css"

const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("upcoming")

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/exhibitions")
        if (!response.ok) {
          throw new Error("Failed to fetch exhibitions")
        }
        const data = await response.json()
        setExhibitions(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchExhibitions()
  }, [])

  // Filter exhibitions based on active tab
  const filterExhibitions = () => {
    const currentDate = new Date()

    if (activeTab === "upcoming") {
      return exhibitions.filter((exhibition) => new Date(exhibition.startDate) > currentDate)
    } else if (activeTab === "current") {
      return exhibitions.filter(
        (exhibition) => new Date(exhibition.startDate) <= currentDate && new Date(exhibition.endDate) >= currentDate,
      )
    } else {
      return exhibitions.filter((exhibition) => new Date(exhibition.endDate) < currentDate)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return <div className="loading">Loading exhibitions...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  const filteredExhibitions = filterExhibitions()

  return (
    <div className="exhibitions-page">
      <div className="container">
        <h1 className="page-title">Art Exhibitions</h1>

        <div className="exhibitions-tabs">
          <button
            className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`tab-btn ${activeTab === "current" ? "active" : ""}`}
            onClick={() => setActiveTab("current")}
          >
            Current
          </button>
          <button className={`tab-btn ${activeTab === "past" ? "active" : ""}`} onClick={() => setActiveTab("past")}>
            Past
          </button>
        </div>

        {filteredExhibitions.length === 0 ? (
          <div className="no-exhibitions">
            <p>No {activeTab} exhibitions to display</p>
          </div>
        ) : (
          <div className="exhibitions-grid">
            {filteredExhibitions.map((exhibition) => (
              <div className="exhibition-card" key={exhibition._id}>
                <div className="exhibition-image">
                  <img src={exhibition.imageUrl || "/placeholder.svg?height=300&width=500"} alt={exhibition.title} />
                  {exhibition.featured && <span className="featured-badge">Featured</span>}
                </div>
                <div className="exhibition-content">
                  <h2 className="exhibition-title">{exhibition.title}</h2>
                  <div className="exhibition-dates">
                    <span className="date-range">
                      {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
                    </span>
                  </div>
                  <div className="exhibition-location">{exhibition.location}</div>
                  <p className="exhibition-description">{exhibition.description}</p>

                  {exhibition.artists && exhibition.artists.length > 0 && (
                    <div className="exhibition-artists">
                      <h3>Featured Artists:</h3>
                      <ul>
                        {exhibition.artists.map((artist) => (
                          <li key={artist._id}>{artist.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Exhibitions
