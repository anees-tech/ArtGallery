"use client"

import { useState } from "react"
import "./Feedback.css"

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit feedback")
      }

      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        message: "",
        rating: 5,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="feedback-page">
      <div className="container">
        <h1 className="page-title">Share Your Feedback</h1>
        <p className="page-subtitle">
          We value your opinion and would love to hear about your experience with our art gallery
        </p>

        <div className="feedback-container">
          <div className="feedback-form-container">
            {success ? (
              <div className="feedback-success">
                <h2>Thank You for Your Feedback!</h2>
                <p>We appreciate you taking the time to share your thoughts with us.</p>
                <button className="btn" onClick={() => setSuccess(false)}>
                  Submit Another Feedback
                </button>
              </div>
            ) : (
              <form className="feedback-form" onSubmit={handleSubmit}>
                {error && <div className="feedback-error">{error}</div>}

                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
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
                  <label>Your Rating</label>
                  <div className="rating-selector">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${formData.rating >= star ? "active" : ""}`}
                        onClick={() => handleRatingChange(star)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Feedback</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn submit-btn" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            )}
          </div>

          <div className="feedback-info">
            <h2>Why Your Feedback Matters</h2>
            <p>
              At ArtGallery, we are committed to providing the best experience for art enthusiasts and collectors. Your
              feedback helps us improve our services and curate better collections.
            </p>

            <div className="feedback-contact">
              <h3>Other Ways to Reach Us</h3>
              <ul>
                <li>Email: feedback@artgallery.com</li>
                <li>Phone: +1 (123) 456-7890</li>
                <li>Visit: 123 Art Street, Gallery City</li>
              </ul>
            </div>

            <div className="feedback-hours">
              <h3>Gallery Hours</h3>
              <ul>
                <li>Monday - Friday: 10:00 AM - 6:00 PM</li>
                <li>Saturday: 11:00 AM - 5:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback
