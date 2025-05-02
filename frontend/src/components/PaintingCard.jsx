import { Link } from "react-router-dom"
import "./PaintingCard.css"

const PaintingCard = ({ painting }) => {
  return (
    <div className="painting-card">
      <Link to={`/painting/${painting._id}`}>
        <div className="painting-image-container">
          <img src={painting.imageUrl || "/placeholder.svg"} alt={painting.title} className="painting-image" />
        </div>
        <div className="painting-info">
          <h3 className="painting-title">{painting.title}</h3>
          <p className="painting-artist">by {painting.artist.name}</p>
          <p className="painting-price">${painting.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  )
}

export default PaintingCard
