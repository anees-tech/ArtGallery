import "./Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3 className="footer-title">ArtGallery</h3>
          <p className="footer-description">Showcasing beautiful paintings from talented artists around the world.</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/gallery">Gallery</a>
            </li>
            <li>
              <a href="/artists">Artists</a>
            </li>
            <li>
              <a href="/exhibitions">Exhibitions</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact</h3>
          <ul className="footer-contact">
            <li>Email: info@artgallery.com</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: 123 Art Street, Gallery City</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} ArtGallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
