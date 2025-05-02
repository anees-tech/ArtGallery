"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = ({ user, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          ArtGallery
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <span className={`menu-icon-bar ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`menu-icon-bar ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`menu-icon-bar ${isMenuOpen ? "open" : ""}`}></span>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/gallery" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Gallery
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/artists" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Artists
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/exhibitions" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Exhibitions
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/feedback" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Feedback
            </Link>
          </li>
          {user ? (
            <>
              <li className="navbar-item">
                <Link to="/cart" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  Cart
                </Link>
              </li>
              {user.isAdmin && (
                <li className="navbar-item">
                  <Link to="/admin" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                    Admin
                  </Link>
                </li>
              )}
              <li className="navbar-item">
                <button
                  className="navbar-link logout-btn"
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link register-link" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
