import Painting from "../models/paintingModel.js"

// @desc    Fetch all paintings
// @route   GET /api/paintings
// @access  Public
export const getPaintings = async (req, res) => {
  try {
    const paintings = await Painting.find({}).populate("artist", "name")
    res.json(paintings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Fetch featured paintings
// @route   GET /api/paintings/featured
// @access  Public
export const getFeaturedPaintings = async (req, res) => {
  try {
    const paintings = await Painting.find({ isFeatured: true }).populate("artist", "name").limit(6)
    res.json(paintings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Fetch single painting
// @route   GET /api/paintings/:id
// @access  Public
export const getPaintingById = async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id).populate("artist", "name biography imageUrl")

    if (painting) {
      res.json(painting)
    } else {
      res.status(404)
      throw new Error("Painting not found")
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// @desc    Create a painting
// @route   POST /api/paintings
// @access  Private/Admin
export const createPainting = async (req, res) => {
  try {
    const { title, description, price, imageUrl, artist, medium, dimensions, year, category, isFeatured } = req.body

    const painting = new Painting({
      title,
      description,
      price,
      imageUrl,
      artist,
      medium,
      dimensions,
      year,
      category,
      isFeatured: isFeatured || false,
    })

    const createdPainting = await painting.save()
    res.status(201).json(createdPainting)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update a painting
// @route   PUT /api/paintings/:id
// @access  Private/Admin
export const updatePainting = async (req, res) => {
  try {
    const { title, description, price, imageUrl, artist, medium, dimensions, year, category, isFeatured, inStock } =
      req.body

    const painting = await Painting.findById(req.params.id)

    if (painting) {
      painting.title = title || painting.title
      painting.description = description || painting.description
      painting.price = price || painting.price
      painting.imageUrl = imageUrl || painting.imageUrl
      painting.artist = artist || painting.artist
      painting.medium = medium || painting.medium
      painting.dimensions = dimensions || painting.dimensions
      painting.year = year || painting.year
      painting.category = category || painting.category
      painting.isFeatured = isFeatured !== undefined ? isFeatured : painting.isFeatured
      painting.inStock = inStock !== undefined ? inStock : painting.inStock

      const updatedPainting = await painting.save()
      res.json(updatedPainting)
    } else {
      res.status(404)
      throw new Error("Painting not found")
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// @desc    Delete a painting
// @route   DELETE /api/paintings/:id
// @access  Private/Admin
export const deletePainting = async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id)

    if (painting) {
      await painting.remove()
      res.json({ message: "Painting removed" })
    } else {
      res.status(404)
      throw new Error("Painting not found")
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
