"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./ArtistProfiles.css"

const ArtistProfiles = () => {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/artists")
        if (!response.ok) {
          throw new Error("Failed to fetch artists")
        }
        const data = await response.json()
        setArtists(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchArtists()
  }, [])

  // Filter artists based on search term
  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.nationality.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="artists-page">
      <div className="container">
        <h1 className="page-title">Artist Profiles</h1>
        <p className="page-subtitle">Learn about the talented artists behind our collection</p>

        <div className="artists-search">
          <input
            type="text"
            placeholder="Search artists by name or nationality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="loading">Loading artists...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : filteredArtists.length === 0 ? (
          <div className="no-artists">
            <p>No artists match your search. Please try a different term.</p>
          </div>
        ) : (
          <div className="artists-grid">
            {filteredArtists.map((artist) => (
              <div className="artist-card" key={artist._id}>
                <div className="artist-image">
                  <img src={artist.imageUrl || "/placeholder.svg?height=300&width=300"} alt={artist.name} />
                  {artist.featured && <span className="featured-badge">Featured</span>}
                </div>
                <div className="artist-info">
                  <h2 className="artist-name">{artist.name}</h2>
                  <p className="artist-nationality">{artist.nationality}</p>
                  <p className="artist-years">
                    {artist.birthYear} - {artist.deathYear || "Present"}
                  </p>
                  <div className="artist-bio-preview">{artist.biography.substring(0, 150)}...</div>
                  <Link to={`/artists/${artist._id}`} className="btn artist-btn">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ArtistProfiles
