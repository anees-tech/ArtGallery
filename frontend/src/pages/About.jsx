import "./About.css"

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="page-title">About Our Gallery</h1>

        <div className="about-intro">
          <div className="about-image">
            <img src="/placeholder.svg?height=400&width=600" alt="Art Gallery Interior" />
          </div>
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Founded in 2010, ArtGallery has grown from a small local exhibition space to a renowned platform for
              artists and art enthusiasts. Our mission is to connect talented artists with art lovers and collectors,
              providing a space where creativity thrives and artistic expression is celebrated.
            </p>
            <p>
              We believe that art has the power to inspire, challenge, and transform. Through our carefully curated
              collections, we aim to showcase diverse perspectives and artistic styles that reflect the rich tapestry of
              human experience.
            </p>
          </div>
        </div>

        <div className="about-values">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Artistic Excellence</h3>
              <p>
                We are committed to showcasing artwork of the highest quality, representing both established and
                emerging artists who demonstrate exceptional skill and creativity.
              </p>
            </div>
            <div className="value-card">
              <h3>Inclusivity</h3>
              <p>
                We celebrate diversity in artistic expression and strive to represent artists from various backgrounds,
                cultures, and artistic traditions.
              </p>
            </div>
            <div className="value-card">
              <h3>Education</h3>
              <p>
                We believe in the importance of art education and offer programs that help visitors deepen their
                understanding and appreciation of art.
              </p>
            </div>
            <div className="value-card">
              <h3>Community</h3>
              <p>
                We foster a sense of community among artists, collectors, and art enthusiasts, creating spaces for
                meaningful connections and conversations.
              </p>
            </div>
          </div>
        </div>

        <div className="about-team">
          <h2 className="section-title">Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="/placeholder.svg?height=200&width=200" alt="Sarah Johnson" />
              </div>
              <h3 className="member-name">Sarah Johnson</h3>
              <p className="member-title">Gallery Director</p>
              <p className="member-bio">
                With over 15 years of experience in the art world, Sarah brings a wealth of knowledge and passion to her
                role as Gallery Director.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/placeholder.svg?height=200&width=200" alt="Michael Chen" />
              </div>
              <h3 className="member-name">Michael Chen</h3>
              <p className="member-title">Curator</p>
              <p className="member-bio">
                Michael's keen eye for emerging talent and innovative artistic approaches has helped shape our gallery's
                distinctive collection.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/placeholder.svg?height=200&width=200" alt="Elena Rodriguez" />
              </div>
              <h3 className="member-name">Elena Rodriguez</h3>
              <p className="member-title">Education Coordinator</p>
              <p className="member-bio">
                Elena develops our educational programs, making art accessible and engaging for visitors of all ages and
                backgrounds.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/placeholder.svg?height=200&width=200" alt="David Kim" />
              </div>
              <h3 className="member-name">David Kim</h3>
              <p className="member-title">Gallery Manager</p>
              <p className="member-bio">
                David ensures the smooth operation of our gallery, coordinating exhibitions and managing client
                relationships with professionalism and care.
              </p>
            </div>
          </div>
        </div>

        <div className="about-visit">
          <h2 className="section-title">Visit Us</h2>
          <div className="visit-info">
            <div className="visit-details">
              <h3>Gallery Hours</h3>
              <ul className="hours-list">
                <li>
                  <span className="day">Monday - Friday:</span> 10:00 AM - 6:00 PM
                </li>
                <li>
                  <span className="day">Saturday:</span> 11:00 AM - 5:00 PM
                </li>
                <li>
                  <span className="day">Sunday:</span> Closed
                </li>
              </ul>

              <h3>Location</h3>
              <address>
                123 Art Street
                <br />
                Gallery City, GC 12345
                <br />
                United States
              </address>

              <h3>Contact</h3>
              <p>
                Phone: +1 (123) 456-7890
                <br />
                Email: info@artgallery.com
              </p>
            </div>
            <div className="visit-map">
              <img src="/placeholder.svg?height=300&width=500" alt="Gallery Location Map" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
